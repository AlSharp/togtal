const request = require('request');
const verifier = require('google-id-token-verifier');
const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = function() {
  return function(req, res, next) {
    console.log('===========SESSION MANAGER IN ACTION!=============');
    console.log('googleToken: ', req.body.googleToken);
    console.log('facebookToken: ', req.body.facebookToken);
    if (req.body.googleToken || req.body.facebookToken) { // token only exist in login action 
      if (req.body.googleToken) {
        console.log('<< req.body.token exists? >> => TRUE');
        const googleToken = req.body.googleToken;
        const clientId = keys.googleClientID;
        verifier.verify(googleToken, clientId, (err, tokenInfo) => { // request tokenInfo from google
          if (!err && tokenInfo.aud === clientId) { // if no errors and client ids are equal
            User.findOne({ googleId: tokenInfo.sub }).then((existingUser) => {
              if (existingUser) { // if user with googleid exists in db
                req.session.user = {id: ''};
                req.session.user.id = existingUser.id;
                req.body.logged = true; // this being sent to client as res.send({ logged: req.body.logged })
                console.log('<< LOGGED >> => TRUE', req.session.user);
                next();
              } else { // esle create new user with googleid 
                new User({ googleId: tokenInfo.sub })
                  .save()
                  .then(user => { 
                    req.session.user = {id: ''};
                    req.session.user.id = user.id; 
                    req.body.logged = true; // this being sent to client as res.send({ logged: req.body.logged })
                    console.log('<< LOGGED >> => TRUE', req.session.user);
                    next();
                  });
              }
            });
          } else {
            req.body.logged = false; // this being sent to client as res.send({ logged: req.body.logged })
            console.log('<< LOGGED >> => FALSE OR SOME ERROR', req.session.user);
            next();
          }
        });
      }
      if (req.body.facebookToken) {
        const facebookToken = req.body.facebookToken;
        const appId = '443028896114311';
        const profileId = req.body.profileId;
        const url = `https://graph.facebook.com/debug_token?input_token=${facebookToken}&access_token=${appId}|${keys.facebookClientSecret}`;
        request(url, function(error, response, body) {
          const res = JSON.parse(response.body);
          if (!error && res.data.app_id === appId && res.data.user_id === profileId) { // if no errors and client ids are equal
            User.findOne({ googleId: profileId }).then((existingUser) => {
              console.log('profile: ', profileId);
              if (existingUser) { // if user with googleid exists in db
                req.session.user = {id: ''};
                req.session.user.id = existingUser.id;
                req.body.logged = true; // this being sent to client as res.send({ logged: req.body.logged })
                console.log('<< LOGGED >> => TRUE', req.session.user);
                next();
              } else { // esle create new user with googleid 
                new User({ googleId: profileId })
                  .save()
                  .then(user => { 
                    req.session.user = {id: ''};
                    req.session.user.id = user.id;
                    req.body.logged = true; // this being sent to client as res.send({ logged: req.body.logged })
                    console.log('<< LOGGED >> => TRUE', req.session.user);
                    next();
                  });
              }
            });
          } else {
            req.body.logged = false; // this being sent to client as res.send({ logged: req.body.logged })
            console.log('<< LOGGED >> => FALSE OR SOME ERROR', req.session.user);
            next();
          }
        });
      }
    } else {
      console.log('<< req.body.token exists? >> => FALSE'); // not login action
      if (req.session.user) { // if session exists = user logged in and does something
        console.log('<< req.session.user >> => TRUE');
        if (req.originalUrl === '/api/v1/logout') { // user wants to log out
          console.log('<< THIS IS LOGOUT >>');
          delete req.session.user;
          delete req.user;
          next();
        } else { // user does something
          User.findById({ _id: req.session.user.id })
            .then(user => {
              console.log('USER.findByID: ', user);
              req.user = user;
              next();
            }
          );
        }
      } else { // in case there is no session
        console.log('<< THERE IS NO SESSION >>');
        next();
      }
    }
  }
}
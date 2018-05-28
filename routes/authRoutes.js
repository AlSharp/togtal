const verifier = require('google-id-token-verifier');
const keys = require('../config/keys');

module.exports = app => {
  app.post('/api/v1/tokensignin', (req, res) => {
    console.log('finish of auth path');
    res.send({ logged: req.body.logged });
  });

  app.get('/api/v1/logout', (req, res) => {
    res.send(req.user);
  });

  app.get('/api/v1/current_user', (req, res) => {
    console.log('current_user: ', req.user);
    console.log(req.session.user);
    res.send(req.user);
  });
}
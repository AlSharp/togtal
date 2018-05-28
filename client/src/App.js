import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import MainContainer from './components/MainContainer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggingIn: false,
      loggedIn: false,
    }
  }

  handleAuth() {
    if (!this.state.loggedIn) {
      this.setState({ loggingIn: true });
    } else {
      axios.get('/api/v1/logout')
        .then((response) => {
          this.setState({ loggedIn: false });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  handleSignInCloseForm() {
    this.setState({ loggingIn: false });
  }

  responseGoogle(response) {
    console.log('GoogleUser: ', response);
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    axios.post('/api/v1/tokensignin', { googleToken: response.tokenId }, headers)
      .then((response) => {
        const logged = response.data.logged;
        this.setState({ loggingIn: !logged, loggedIn: logged })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  responseFacebook(data) {
    console.log(data);
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    axios.post('/api/v1/tokensignin',
      {
        facebookToken: data.tokenDetail.accessToken,
        profileId: data.profile.id
      }, headers)
      .then((response) => {
        const logged = response.data.logged;
        this.setState({ loggingIn: !logged, loggedIn: logged })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return(
      <div className="App">
        <Header 
          handleAuth = { this.handleAuth.bind(this) }
          loggedIn = { this.state.loggedIn }
        />
        <MainContainer
          responseGoogle = { this.responseGoogle.bind(this) }
          responseFacebook = { this.responseFacebook.bind(this) }
          handleSignInCloseForm = { this.handleSignInCloseForm.bind(this) }
          loggingIn = { this.state.loggingIn }
        />
      </div>
    )
  }
}

export default App;

import React, { Component } from 'react';
import { connect } from 'react-redux';

import  { BarLoader } from 'react-spinners';
import InvisibleHeader from './invisibleHeader';
import LeftContainer from './LeftContainer';
import RightContainer from './RightContainer';
import LoginForm from './login/loginForm';

class MainContainer extends Component {
  render() {
    const {
      responseGoogle,
      responseFacebook,
      handleSignInCloseForm,
      loggingIn,
      haveGoogleMapViewportWidth } = this.props;
    return (
      <div className="main-container">
        <InvisibleHeader />
        { haveGoogleMapViewportWidth ? <LeftContainer /> : null }
        { haveGoogleMapViewportWidth ? <RightContainer /> : null } 
        {
          haveGoogleMapViewportWidth ? null :
          <BarLoader
            color={'#4A90E2'}
            width={200}
            height={6}
          />
        }
        {
          loggingIn ? 
          <LoginForm
            responseGoogle = { responseGoogle }
            responseFacebook = { responseFacebook }
            handleSignInCloseForm = { handleSignInCloseForm }
          />
          : null
        }
      </div>
    );
  }
}

function mapStatetoProps(state) {
  return {
    haveGoogleMapViewportWidth: state.controls.haveGoogleMapViewportWidth
  }
}

export default connect(mapStatetoProps)(MainContainer);
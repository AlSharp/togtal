import React, { Component } from "react";

import { Form, FormGroup, FormControl, Button } from "react-bootstrap";
import GoogleLogin from 'react-google-login';
import FacebookProvider, { Login } from 'react-facebook';

class LoginForm extends Component {
  render() {
    const { handleSignInCloseForm } = this.props;
    return(
      <div className="login-form">
        <div className="login-form-header">
          <span>Sign In</span>
          <i
            className="material-icons"
            onClick={handleSignInCloseForm}
          >
          close
          </i>
        </div>
        <div className="login-form-body">
          <Form>
            <FormGroup>
              <FormControl type="text" placeholder="Email" />
            </FormGroup>
            <FormGroup>
              <FormControl type="text" placeholder="Password" />
            </FormGroup>
            <FormGroup>
              <Button type="submit" bsStyle="primary">Sign in</Button>
              <Button bsStyle="link">Forgot your password?</Button>
            </FormGroup>
          </Form>
        </div>
        <p>OR</p>
        <div className="login-form-extra">
          <GoogleLogin
            className = 'btn btn-danger btn-block'
            clientId = "797348459287-3g7h2epq6d1sadqk3hs97jre4c3gaegc.apps.googleusercontent.com"
            onSuccess = {this.props.responseGoogle}
            onFailure = {this.props.responseGoogle}
          >
            <i className="fa fa-google-plus"></i>
            <span>Continue with Google</span>
          </GoogleLogin>
          <FacebookProvider appId="443028896114311">
            <Login
              scope="public_profile,email"
              onResponse={this.props.responseFacebook}
              onError={this.props.responseFacebook}
            >
              <Button bsStyle="primary" block>
                <i className="fa fa-facebook"></i>
                <span>Continue with Facebook</span>
              </Button>
            </Login>
          </FacebookProvider>
        </div>
      </div>
    )
  }
}

export default LoginForm;
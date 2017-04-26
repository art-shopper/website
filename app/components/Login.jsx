import React from 'react';
import { Button, Input, Row, Col } from 'react-materialize';
import { Link, browserHistory } from 'react-router';

export const Login = ({ login }) => (
  <Row>
    <Col s={10} m={6} l={6} offset="s1 m3 l3">
      <p className="caption"> Login </p>
      <form
        onSubmit={evt => {
          evt.preventDefault();
          login(evt.target.username.value, evt.target.password.value);
          toastr.success(`You've been logged in.`)
          browserHistory.push('/');
        }}
      >
        <Input name="username" label="Email" s={12} />
        <Input name="password" label="Password" type="password" s={12} />
        <button style={{margin: 10}} className="btn waves-effect waves-light" type="submit" name="action" value="Login">Log in
        <i className="material-icons right">vpn_key</i>
        </button>
        <div>
          <div className="or-text">
            <span>OR</span>
          </div>
        </div>
      </form>
      <div className="flex">
        <p>
          <a href="/api/auth/login/google">
            <Button className="auth-color" style={{margin: 5}}>
              <span>Log in with Google</span>
            </Button>
          </a>
        </p>
        <p>
          <a href="/api/auth/login/github">
            <Button className="auth-color" style={{margin: 5}}>
              <span>Log in with GitHub</span>
            </Button>
          </a>
        </p>
        <p>
          <a href="/api/auth/login/facebook">
            <Button className="auth-color" style={{margin: 5}}>
              <span>Log in with Facebook</span>
            </Button>
          </a>
        </p>
      </div>

    </Col>
  </Row>
);

import { login } from 'APP/app/reducers/auth';
import { connect } from 'react-redux';

export default connect(state => ({}), { login })(Login);

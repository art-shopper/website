import React from 'react';
import { Button, Input, Row, Col } from 'react-materialize';
import { Link, browserHistory } from 'react-router';

export const Login = ({ login }) => (
  <Row>
    <Col s={10} m={6} l={4} offset="s1 m3 l4">
      <p className="caption"> Login </p>
      <form
        onSubmit={evt => {
          evt.preventDefault();
          login(evt.target.username.value, evt.target.password.value);
          browserHistory.push('/');
        }}
      >
        <Input name="username" label="Email" s={12} />
        <Input name="password" label="Password" type="password" s={12} />
        <Input type="submit" value="Login" />
        <div>
          <div>
            <span>OR</span>
          </div>
        </div>
      </form>
      <a href="/api/auth/login/google">
        <Button name="google">Google</Button>
      </a>
    </Col>
  </Row>
);

import { login } from 'APP/app/reducers/auth';
import { connect } from 'react-redux';

export default connect(state => ({}), { login })(Login);

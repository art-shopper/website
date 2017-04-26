import React from 'react';
import { connect } from 'react-redux';
import { signupAndGoToUser } from '../reducers/auth';
import { Col, Row, Input, Button } from 'react-materialize';

/* -----------------    COMPONENT     ------------------ */

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.onSignupSubmit = this.onSignupSubmit.bind(this);
  }

  render() {
    return (
      <div className="row flex signup-height">
        <Col s={12} m={6} l={4} offset="s1 m1 l1" className="flexgrow">
          <form onSubmit={this.onSignupSubmit}>
            <Input
              label="First Name"
              name="first_name"
              type="text"
              s={12}
              required
            />
            <Input
              label="Last Name"
              name="last_name"
              type="text"
              s={12}
              required
            />
            <Input
              label="Email"
              name="email"
              type="email"
              s={12}
              required
              validate
            />
            <Input
              label="Password"
              name="password"
              type="password"
              s={12}
              required
            />
            <Button style={{margin: 10}} type="submit">Sign Up
            <i className="material-icons right">trending_up</i></Button>
          </form>
        </Col>
        <Col s={12} m={1} l={1}>
          <div className="or-text">
            <span> OR </span>
          </div>
        </Col>
        <Col s={12} m={4} l={4}>
          <div className="flex">
            <p>
              <a href="/api/auth/login/google">
                <Button className="auth-color" style={{margin: 5}}>
                  <span>Sign Up with Google</span>
                </Button>
              </a>
            </p>
            <p>
              <a href="/api/auth/login/github">
                <Button className="auth-color" style={{margin: 5}}>
                  <span>Sign up with GitHub</span>
                </Button>
              </a>
            </p>
            <p>
              <a href="/api/auth/login/facebook">
                <Button className="auth-color" style={{margin: 5}}>
                  <span>Sign up with Facebook</span>
                </Button>
              </a>
            </p>
          </div>
        </Col>
      </div>
    );
  }

  onSignupSubmit(event) {
    event.preventDefault();
    const credentials = {
      first_name: event.target.first_name.value,
      last_name: event.target.last_name.value,
      email: event.target.email.value,
      password: event.target.password.value,
    };

    // console.log(credentials);
    toastr.success(`Great! You've successfully created an account!.`)
    this.props.signup(credentials);
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = () => ({ });

const mapDispatch = { signup: signupAndGoToUser };

export default connect(mapState, mapDispatch)(Signup);

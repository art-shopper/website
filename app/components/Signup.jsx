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
    const { message } = this.props;
    return (
      <Row>
        <Col s={10} m={6} l={4} offset="s1 m3 l4">
          <div>
            <div>
              <form onSubmit={this.onSignupSubmit}>
                <Input label="First Name" name="first_name" type="text" s={12} required />
                <Input label="Last Name" name="last_name" type="text" s={12} required />
                <Input label="email" name="email" type="email" s={12} required />
                <Input label="password" name="password" type="password" s={12} required />
                <Button type="submit" >{message}</Button>
              </form>
            </div>
            <div>
              <div>
                <span>OR</span>
              </div>
            </div>
            <div >
              <p>
                <a
                  target="_self"
                  href="/api/auth/google"
                  className="btn btn-social btn-google">
                  <span>{message} with Google</span>
                </a>
              </p>
              <p>
                <a
                  target="_self"
                  href="/api/auth/github"
                  className="btn btn-social btn-github">
                  <span>{message} with GitHub</span>
                </a>
              </p>
              <p>
                <a
                  target="_self"
                  href="/api/auth/twitter"
                  className="btn btn-social btn-twitter">
                  <span>{message} with Twitter</span>
                </a>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    );
  }

  onSignupSubmit(event) {
    event.preventDefault();
    const credentials = {
      first_name: event.target.first_name.value,
      last_name: event.target.last_name.value,
      email: event.target.email.value,
      password: event.target.password.value
    };

    console.log(credentials);
    this.props.signup(credentials);
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = () => ({ message: 'Sign up' });

const mapDispatch = { signup: signupAndGoToUser };

export default connect(mapState, mapDispatch)(Signup);

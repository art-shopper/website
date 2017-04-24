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
                <div>
                  <Input placeholder="First Name" type="first_name"s={12} label="First Name" />
                </div>
                <div>
                  <Input placeholder="Last Name" type="last_name" s={12} label="Last Name" />
                </div>
                <div>
                  <Input label="email" name="email" type="email" s={12} required />
                </div>
                <div>
                  <Input label="password" name="password" type="password" s={12} required />
                </div>
                <Button type="submit" >{message}</Button>
              </form>
            </div>
            <div className="or buffer">
              <div className="back-line">
                <span>OR</span>
              </div>
            </div>
            <div >
              <p>
                <a
                  target="_self"
                  href="/api/auth/google"
                  className="btn btn-social btn-google">
                  <i className="fa fa-google" />
                  <span>{message} with Google</span>
                </a>
              </p>
              <p>
                <a
                  target="_self"
                  href="/api/auth/github"
                  className="btn btn-social btn-github">
                  <i className="fa fa-github" />
                  <span>{message} with GitHub</span>
                </a>
              </p>
              <p>
                <a
                  target="_self"
                  href="/api/auth/twitter"
                  className="btn btn-social btn-twitter">
                  <i className="fa fa-twitter" />
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
      first_name: event.target.first_name,
      last_name: event.target.last_name,
      email: event.target.email.value,
      password: event.target.password.value
    };
    this.props.signup(credentials);
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = () => ({ message: 'Sign up' });

const mapDispatch = { signup: signupAndGoToUser };

export default connect(mapState, mapDispatch)(Signup);

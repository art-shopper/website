import { create } from '../components/Users';
import { browserHistory } from 'react-router';
/* -------------------<   ACTIONS   >--------------------- */

const AUTHENTICATED = 'AUTHENTICATED';
const SET = 'SET_CURRENT_USER';

/* ---------------<   ACTION CREATORS   >------------------- */

export const authenticated = user => ({
  type: AUTHENTICATED,
  user,
});

export const set = user => ({ type: SET, user });

/* -------------------<   REDUCERS   >--------------------- */

const reducer = (state = null, action) => {
  switch (action.type) {
    case AUTHENTICATED:
      return action.user;
    case SET:
      return action.user;
  }
  return state;
};

/* ------------------<   DISPATCHERS   >-------------------- */
import axios from 'axios';

// Logging in
export const login = (username, password) => dispatch =>
  axios
    .post('/api/auth/login/local', { username, password })
    .then(() => dispatch(whoami()))
    .catch(() => dispatch(whoami()));

// Logging out
export const logout = () => dispatch =>
  axios
    .post('/api/auth/logout')
    .then(() => dispatch(whoami()))
    .catch(() => dispatch(whoami()));

export const signup = credentials => dispatch => {
  return axios
    .post('/api/auth/login/local', credentials)
    .then(res => res.data)
    .then(user => {
      dispatch(create(user)); // so new user appears in our master list
      dispatch(set(user)); // set current user
      return user;
    });
};

export const signupAndGoToUser = credentials => dispatch => {
  dispatch(signup(credentials))
    .then(user => browserHistory.push(`/users/${user.id}`))
    .catch(err => console.error('Problem signing up:', err));
};

// Getting user info
export const whoami = () => dispatch =>
  axios
    .get('/api/auth/whoami')
    .then(response => {
      const user = response.data;
      dispatch(authenticated(user));
    })
    .catch(failed => dispatch(authenticated(null)));

export default reducer;

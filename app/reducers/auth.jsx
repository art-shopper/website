/* -------------------<   ACTIONS   >--------------------- */

const AUTHENTICATED = 'AUTHENTICATED'

/* ---------------<   ACTION CREATORS   >------------------- */

export const authenticated = user => ({
  type: AUTHENTICATED, user
});

/* -------------------<   REDUCERS   >--------------------- */

const reducer = (state=null, action) => {
  switch (action.type) {
  case AUTHENTICATED:
    return action.user
  }
  return state
};

/* ------------------<   DISPATCHERS   >-------------------- */
import axios from 'axios';

// Logging in
export const login = (username, password) =>
  dispatch =>
    axios.post('/api/auth/login/local',
      {username, password})
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()));

// Logging out
export const logout = () =>
  dispatch =>
    axios.post('/api/auth/logout')
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()));

// Getting user info
export const whoami = () =>
  dispatch =>
    axios.get('/api/auth/whoami')
      .then(response => {
        const user = response.data
        dispatch(authenticated(user))
      })
      .catch(failed => dispatch(authenticated(null)));

export default reducer;

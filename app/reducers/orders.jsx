/* -------------------<   ACTIONS   >--------------------- */

const SET_ORDERS_LIST = 'SET_ORDERS_LIST';
const SET_CURRENT_ORDER = 'SET_CURRENT_ORDER';
const ADD_ORDER = 'ADD_ORDER';

/* ---------------<   ACTION CREATORS   >------------------- */

// export const authenticated = user => ({
//   type: AUTHENTICATED, user
// })

/* -------------------<   REDUCERS   >--------------------- */

const initialState = {
  list: [],
  selected: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  }
  return state;
};

/* ------------------<   DISPATCHERS   >-------------------- */
import axios from 'axios';

// Fetch all orders (for the current user)


// Fetch a single order


export default reducer;

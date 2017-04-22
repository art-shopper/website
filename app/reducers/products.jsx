/* -------------------<   ACTIONS   >--------------------- */

const SET_PRODUCT_LIST = 'SET_PRODUCT_LIST';
const SET_CURRENT_PRODUCT = 'SET_CURRENT_PRODUCT';

/* ---------------<   ACTION CREATORS   >------------------- */

// export const authenticated = user => ({
//   type: AUTHENTICATED, user
// })

/* -------------------<   REDUCERS   >--------------------- */

const initialState = {
  list: [],
  current: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  }
  return state;
};

/* ------------------<   DISPATCHERS   >-------------------- */
import axios from 'axios';

// Fetch all products (with search)


// Fetch a single product


export default reducer;

/*****
  Reviews redux set will deal with single and multiple reviews.
  Single review in state.reviews.selected.
  Multiple reviews in state.reviews.list.
*****/

/* -------------------<   ACTIONS   >--------------------- */

const SET_LIST = 'SET_LIST';
const SET_CURRENT_REVIEW = 'SET_CURRENT_REVIEW';

/* ---------------<   ACTION CREATORS   >------------------- */

// export const authenticated = user => ({
//   type: AUTHENTICATED, user
// })

/* -------------------<   REDUCERS   >--------------------- */

const initialState = {
  list: [],
  selected: {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
  }
  return state;
};

/* ------------------<   DISPATCHERS   >-------------------- */
import axios from 'axios';

// Fetch all reviews for a product


// Fetch all reviews for a user


// Fetch a single review


export default reducer;

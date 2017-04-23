/*****
  Reviews redux set will deal with single and multiple reviews.
  Single review in state.reviews.selected.
  Multiple reviews in state.reviews.list.
*****/

/* -------------------<   ACTIONS   >--------------------- */

const SET_REVIEWS_LIST = 'SET_REVIEWS_LIST';
const SET_CURRENT_REVIEW = 'SET_CURRENT_REVIEW';
const ADD_REVIEW = 'ADD_REVIEW';

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

// Fetch all reviews for a product
export const fetchReviews = () => dispatch => {
  axios.get(`/api/reviews`)
  .then(res => res.data)
  .then(reviews => dispatach(setReviews(reviews)))
  .catch(err => console.log(err))
};

// Fetch all reviews for a user


// Fetch a single review


export default reducer;

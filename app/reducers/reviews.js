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

export const setReviews = reviews => ({
  type: SET_REVIEWS_LIST, reviews
})

export const setReview = review => ({
  type: SET_CURRENT_REVIEW, review
})

export const addReview = review => ({
  type: ADD_REVIEW, review
})
/* -------------------<   REDUCERS   >--------------------- */

const initialState = {
  list: [],
  selected: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_REVIEW:
      return Object.assign({}, state, {
        selected: action.reviews
      });
    case SET_REVIEWS_LIST:
      return Object.assign({}, state, {
        list: action.reviews
      });
    case ADD_REVIEW:
      return Object.assign({}, state, {
        list: [action.review, ... state.list]
      });
  }
  return state;
};

/* ------------------<   DISPATCHERS   >-------------------- */
import axios from 'axios';

// Fetch all reviews for a product
export const fetchReviews = () => dispatch => {
  axios.get(`/api/reviews`)
  .then(res => res.data)
  .then(reviews => dispatch(setReviews(reviews)))
  .catch(err => console.log(err))
};

// Fetch all reviews for a user
// OB/DY: might have user reviews go to user reducer
export const fetchUserReviews = (userId) => dispatch => {
  axios.get(`/api/users/{userId}/reviews`) // OB/YP: "going broke"
  .then(res => res.data)
  .then(reviews => dispatch(setReviews(reviews)))
  .catch(err => console.log(err))
};

// Fetch all reviews for a product
export const fetchProductReviews = (productId) => dispatch => {
  axios.get(`/api/products/{productId}/reviews`)
  .then(res => res.data)
  .then(reviews => dispatch(setReviews(reviews)))
  .catch(err => console.log(err))
};

// Fetch a single review
export const fetchReview = (reviewId) => dispatch => {
  axios.get(`/api/reviews/reviewId`) // OB/YP: missing money and mustaches
  .then(res => res.data)
  .then(review => dispatch(setReview(review)))
  .catch(err => console.log(err))
};

//add a review
export const postReview = (review) => dispatch => {
  axios.post(`/api/users/{userId}/reviews`, review)
  .then(review => dispatch(addReview(review)))
  .catch(err => console.log(err));
}

export default reducer;

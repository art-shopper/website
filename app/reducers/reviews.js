/*****
  Reviews redux set will deal with single and multiple reviews.
  Single review in state.reviews.selected.
  Multiple reviews in state.reviews.list.
*****/

/* -------------------<   ACTIONS   >--------------------- */

// const AUTHENTICATED = 'AUTHENTICATED';

/* ---------------<   ACTION CREATORS   >------------------- */

// export const authenticated = user => ({
//   type: AUTHENTICATED, user
// })

/* -------------------<   REDUCERS   >--------------------- */

const initialState = {
  list: [],
  selected: {}
}

const reducer = (state = [], action) => {
  switch (action.type) {
  }
  return state;
};

/* ------------------<   DISPATCHERS   >-------------------- */
import axios from 'axios';

export default reducer;

/* -------------------<   ACTIONS   >--------------------- */

const SET_PRODUCT_LIST = 'SET_PRODUCT_LIST';
const SET_CURRENT_PRODUCT = 'SET_CURRENT_PRODUCT';

/* ---------------<   ACTION CREATORS   >------------------- */

export const setProducts = products => ({
  type: SET_PRODUCT_LIST, products
})

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

// Fetch all products (with search)
export const fetchProducts = dispatch => {
  axios.get('/api/products')
    .then(products => dispatch(setProducts(products)))
    .catch(err => console.log(err)) // TODO: real err handling
};

// Fetch a single product


export default reducer;

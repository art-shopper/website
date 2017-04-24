/*****
  Products redux set will deal with single and multiple products.
  Single review in state.products.selected.
  Multiple reviews in state.products.list.
*****/

/* -------------------<   ACTIONS   >--------------------- */

const SET_PRODUCT_LIST = 'SET_PRODUCT_LIST';
const SET_CURRENT_PRODUCT = 'SET_CURRENT_PRODUCT';

/* ---------------<   ACTION CREATORS   >------------------- */

export const setProducts = products => ({
  type: SET_PRODUCT_LIST, products
})

export const setProduct = product => ({
  type: SET_CURRENT_PRODUCT, product
})

/* -------------------<   REDUCERS   >--------------------- */

const initialState = {
  list: [],
  selected: {}
};

// OB/YP: could combine reducers here

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT_LIST:
      return Object.assign({}, state, {list: action.products});
    case SET_CURRENT_PRODUCT:
      return Object.assign({}, state, {selected: action.product})
  }
  return state;
};

/* ------------------<   DISPATCHERS   >-------------------- */
import axios from 'axios';

// Fetch all products (with search)
// OB/YP: consider default values (or maybe that's not working)
export const fetchProducts = (searchStr, offset) => dispatch => {
  return axios.get(`/api/products?searchStr=${searchStr || ''}&offset=${offset || 0}`)
    .then(res => res.data)
    .then(products => dispatch(setProducts(products)))
    .catch(err => console.log(err)) // TODO: real err handling
};

// Fetch a single product
export const fetchProduct = (productId) => dispatch => {
  return axios.get(`/api/products/${productId}`)
    .then(res => res.data)
    .then(product => dispatch(setProduct(product)))
    .catch(err => console.log(err)) // TODO: real err handling
};

// Fetch products for home page
export const fetchHomeProducts = () => dispatch => {
  return axios.get('/api/products/homepage')
    .then(res => res.data)
    .then(products => dispatch(setProducts(products)))
    .catch(err => console.log(err)) // TODO: real err handling
};

export default reducer;

/* -------------------<   ACTIONS   >--------------------- */

const SET_ORDERS_LIST = 'SET_ORDERS_LIST';
const SET_CURRENT_ORDER = 'SET_CURRENT_ORDER';
const ADD_ORDER = 'ADD_ORDER';

/* ---------------<   ACTION CREATORS   >------------------- */

export const addOrder = order => ({
  type: ADD_ORDER, order
})

export const currentOrder = order => ({
  type: SET_CURRENT_ORDER, order
})

export const allOrders = orders => ({
  type: SET_ORDERS_LIST, orders
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

// Fetch all orders (for the current user)
export const getUserOrder = (userId) => dispatch => {
  axios.get(`/api/users/{userId}/orders`)
  .then(res => res.data)
  .then(orders => dispatch(allOrders(orders)))
  .catch(err => console.log(err))
};

// Fetch a single order
export const getCurrentOrder = (orderId) => dispatch => {
  axios.get(`/api/orders/{orderId}`)
  .then(res => res.data)
  .then(order => dispatch(currentOrder(order)))
  .catch(err => console.log(err))
};

// Fetch all orders
export const getAllOrders = () => dispatch => {
  axios.get(`/api/orders`)
  .then(res => res.data)
  .then(orders => dispatch(allOrders(orders)))
  .catch(err => console.log(err))
};

export default reducer;

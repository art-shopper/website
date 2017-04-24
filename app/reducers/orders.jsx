/* -------------------<   ACTIONS   >--------------------- */

const SET_ORDERS_LIST = 'SET_ORDERS_LIST';
const SET_CURRENT_ORDER = 'SET_CURRENT_ORDER';

/* ---------------<   ACTION CREATORS   >------------------- */

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

// OB/YP: could combine
// const orderListReducer = (state = []) => {
//   case SET_ORDERS_LIST:
//     return [action.order, ...state.list]
//   default:
//     return state;
// };
// const selectedOrderReducer = (state = {}) => {
//   case SET_CURRENT_ORDER:
//     return action.order;
//   default:
//     return state;
// };
// const reducer = combineReducers({
//   list: orderListReducer,
//   selected: selectedOrderReducer
// });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_ORDER:
      return Object.assign({}, state, {
        selected: action.order
      })
    case SET_ORDERS_LIST: // OB/YP: isn't this an add order?
      return Object.assign({}, state, {
        list: [action.order, ...state.list]
      })
  }
  return state;
};

/* ------------------<   DISPATCHERS   >-------------------- */
import axios from 'axios';

// Fetch all orders (for the current user)
// OB/YP: could instead send orders to current user reducer
export const getUserOrder = (userId) => dispatch => {
  axios.get(`/api/users/{userId}/orders`) // OB/YP: bug, missing money
    .then(res => res.data)
    .then(orders => dispatch(allOrders(orders)))
    .catch(err => console.log(err)) // OB/YP: react toastr or something like it can give low-hanging fruit for error handling
};

// Fetch a single order
export const getCurrentOrder = (orderId) => dispatch => {
  axios.get(`/api/orders/{orderId}`) // OB/YP: bug, missing money
    .then(res => res.data)
    .then(order => dispatch(currentOrder(order)))
    .catch(err => console.log(err))
};

// Fetch all orders (for admin only)
export const getAllOrders = () => dispatch => {
  axios.get(`/api/orders`)
    .then(res => res.data)
    .then(orders => dispatch(allOrders(orders)))
    .catch(err => console.log(err))
};

//
export default reducer;

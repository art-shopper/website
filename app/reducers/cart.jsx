/* -------------------<   ACTIONS   >--------------------- */

const ADD_ORDER_ITEM ='ADD_ORDER_ITEM';
const SUBMIT_ORDER = 'SUBMIT_ORDER';
const DELETE_ITEM = 'DELETE_ITEM';

/* ---------------<   ACTION CREATORS   >------------------- */

export const addProduct = product => ({
  type: ADD_ORDER_ITEM, product
})

export const deleteItem = product => ({
  type: DELETE_ITEM, product
})

export const submitOrder = order => ({ // OB/YP: order arg not needed (see reducer)
  type: SUBMIT_ORDER, order
})
/* -------------------<   REDUCERS   >--------------------- */

const initialState = {
  list: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER_ITEM:
      return Object.assign({}, state, { // OB/YP: check out immutable.js
        list: [action.product, ... state.list]
      })
    case DELETE_ITEM:
      return {
        list: state.list.filter(function(elm) {
          return elm.product_id !== action.product.product_id
        })
      }
    case submitOrder: // OB/YP: bug here, should be SUBMIT_ORDER
      return {
        list: []
      }
  }
  return state
};

/* ------------------<   DISPATCHERS   >-------------------- */
import axios from 'axios';

// Add an item to the state (might not need axios for this)
export const addToCart = product => dispatch(addProduct(product));

// Remove an item from the state
export const removeItem = product => dispatch(deleteItem(product));

//Submit an order which should clear the state
export const placeOrder = order => dispatch => {
  axios.post(`/api/orders`, order)
  .then(res => res.data)
  .then(newOrder => dispatch(submitOrder(newOrder))) // OB/YP: order arg not needed (see reducer)
}

export default reducer;

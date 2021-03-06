/* -------------------<   ACTIONS   >--------------------- */

const ADD_ORDER_ITEM ='ADD_ORDER_ITEM';
export const CLEAR_CART = 'CLEAR_CART';
const DELETE_ITEM = 'DELETE_ITEM';

/* ---------------<   ACTION CREATORS   >------------------- */

export const addProduct = product => ({
  type: ADD_ORDER_ITEM, product
})

export const deleteItem = index => ({
  type: DELETE_ITEM, index
})

export const clearCart = order => ({
  type: CLEAR_CART, order
})
/* -------------------<   REDUCERS   >--------------------- */

const initialState = {
  list: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER_ITEM:
      return Object.assign({}, state, {
        list: [action.product, ... state.list]
      })
    case DELETE_ITEM:
      const newList = state.list.slice(0);
      newList.splice(action.index, 1);
      return {
        list: newList
      }
    case CLEAR_CART:
      return {
        list: []
      }
  }
  return state
};

/* ------------------<   DISPATCHERS   >-------------------- */
import axios from 'axios';

// Add an item to the state (might not need axios for this)
export const addToCart = product => dispatch => {
  dispatch(addProduct({product, quantity: 1}))
};

// Remove an item from the state
export const removeItem = index => dispatch => dispatch(deleteItem(index));

//Submit an order which should clear the state
export const placeOrder = order => dispatch => {
  console.log('order in cart', order)
  axios.post(`/api/orders`, order)
  .then(res => res.data)
  .then(order => dispatch(clearCart(order)))
}

export default reducer;

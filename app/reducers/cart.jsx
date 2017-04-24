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

export const submitOrder = order => ({
  type: SUBMIT_ORDER, order
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
      return {
        list: state.list.filter(function(elm) {
          return elm.product_id !== action.product.product_id
        })
      }
    case submitOrder:
      return {
        list: []
      }
  }
  return state
};

/* ------------------<   DISPATCHERS   >-------------------- */
import axios from 'axios';

// Add an item to the state (might not need axios for this)


// Remove an item from the state


export default reducer;

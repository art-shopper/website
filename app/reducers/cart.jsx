/* -------------------<   ACTIONS   >--------------------- */

const ADD_ORDER_ITEM ='ADD_ORDER_ITEM';
const CLEAR_CART = 'CLEAR_CART';
const DELETE_ITEM = 'DELETE_ITEM';

/* ---------------<   ACTION CREATORS   >------------------- */

export const addProduct = product => ({
  type: ADD_ORDER_ITEM, product
})

export const deleteItem = product => ({
  type: DELETE_ITEM, product
})

export const clearCart = () => ({
  type: CLEAR_CART
})
/* -------------------<   REDUCERS   >--------------------- */

const initialState = {
  list: [
  {title: "something cool", description: "this should be more than 20 characters", price: "$10", quantity: 1, tags: ['tree']}
  ]
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
  dispatch(addProduct(product))
};

// Remove an item from the state
export const removeItem = product => dispatch(deleteItem(product));

//Submit an order which should clear the state
export const placeOrder = order => dispatch => {
  axios.post(`/api/orders`, order)
  .then(res => res.data)
  .then(() => dispatch(clearCart()))
}

export default reducer;

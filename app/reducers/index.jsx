import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth: require('./auth').default,
  cart: require('./cart').default,
  reviews: require('./reviews').default,
  products: require('./products').default,
  orders: require('./orders').default
});

export default rootReducer;

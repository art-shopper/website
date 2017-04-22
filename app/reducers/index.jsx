import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth: require('./auth').default,
  cart: require('./cart').default,
  reviews: require('./reviews').default,
  products: require('./products').default
});

export default rootReducer;

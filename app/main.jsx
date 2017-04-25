'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import Home from './components/Home'
import MyAccount from './components/MyAccount'
import NotFound from './components/NotFound'
import Header from './components/Header'
import Footer from './components/Footer'
import Products from './components/Products'
import ProductViewPage from './components/ProductViewPage'
import Login from './components/Login'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import SingleOrder from './components/SingleOrder'
import SingleReview from './components/SingleReview'

import {fetchProducts, fetchHomeProducts} from './reducers/products';
import {getUserOrders} from './reducers/orders';

const App = connect(
  ({ auth }) => ({ user: auth })
)(
  ({ user, children }) =>
    <div>
      <Header />
        <div id="main-container" className="section">
          {children}
        </div>
      <Footer />
    </div>
)

const RoutesComponent = ({onProductsEnter, onHomeEnter, onAccountEnter}) => (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRedirect to="/home" />
        <Route path="/home" component={Home} onEnter={onHomeEnter} />
        <Route path="/products" component={Products} onEnter={onProductsEnter} onChange={onProductsEnter} />
        <Route path="/products/:id" component={ProductViewPage} />
        <Route path="/account" component={MyAccount} onEnter={onAccountEnter}/>
        <Route path="/orders/1" component={SingleOrder} />
        <Route path="/login" component={Login} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/reviews/:id" component={SingleReview} />
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
)

const mapProps = null;

const mapDispatch = (dispatch, ownProps) => ({
  onProductsEnter:  (nextRouterState) => {
    const queries = browserHistory.getCurrentLocation().query;
    dispatch(fetchProducts(queries.search,
                            queries.offset));
  },
  onHomeEnter: (nextRouterState) => {
    dispatch(fetchHomeProducts());
  },
  onAccountEnter: (nextRouterState) => {
    if(!store.getState().auth) browserHistory.push('/login');
  }
})

const Routes = connect(mapProps, mapDispatch)(RoutesComponent);


render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('main')
)



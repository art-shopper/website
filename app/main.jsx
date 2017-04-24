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

import {fetchProducts, fetchHomeProducts} from './reducers/products';

// browserHistory.listen(location => {
//   console.log(location.query);
//   store.dispatch(fetchProducts(location.query.search,
//                                location.query.offset))
// })

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

const RoutesComponent = ({onProductsEnter, onHomeEnter}) => (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRedirect to="/home" />
        <Route path="/home" component={Home} onEnter={onHomeEnter} />
        <Route path="/products" component={Products} onEnter={onProductsEnter} onChange={onProductsEnter} />
        <Route path="/products/:id" component={ProductViewPage} />
        <Route path="/account" component={MyAccount} />
        <Route path="/orders/1" component={SingleOrder} />
        <Route path="/login" component={Login} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
)

const mapProps = null;

const mapDispatch = dispatch => ({
  onProductsEnter:  (nextRouterState) => {
    const queries = browserHistory.getCurrentLocation().query;
    dispatch(fetchProducts(queries.search,
                            queries.offset));
  },
  onHomeEnter: (nextRouterState) => {
    dispatch(fetchHomeProducts());
  }
})

const Routes = connect(mapProps, mapDispatch)(RoutesComponent);

render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('main')
)



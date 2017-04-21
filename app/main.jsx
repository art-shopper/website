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
import Login from './components/Login'
import Cart from './components/Cart'

const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
)(
  ({ user, children }) =>
    <div>
      <Header />
        <div id="mainContainer" className="section">
          {children}
        </div>
      <Footer />
    </div>
)

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ExampleApp}>
        <IndexRedirect to="/home" />
        <Route path="/home" component={Home} />
        <Route path="/account" component={MyAccount} />
        <Route path="/login" component={Login} />
        <Route path="/cart" component={Cart} />
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('main')
)


import React from 'react'
import {Navbar, NavItem} from 'react-materialize'

import Login from './Login'
import WhoAmI from './WhoAmI'

/* -------------------<   COMPONENT   >-------------------- */

export const Header = (props) => (
  <Navbar brand='logo' left>
    <NavItem href='/'>Login</NavItem>
    <NavItem href='/'>Components</NavItem>
    {/*<NavItem href='/'>{props.user ? <WhoAmI/> : <Login/>}</NavItem>*/}
  </Navbar>
)

/* -------------------<   CONTAINER   >-------------------- */

import {connect} from 'react-redux'

export default connect(
  ({ auth }) => ({ user: auth }),
  {},
)(Header)

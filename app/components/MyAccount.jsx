import React from 'react'
import {Link} from 'react-router'

import {Row, Col, Collection, CollectionItem} from 'react-materialize'

import Orders from './Orders'

/* -------------------<   COMPONENT   >-------------------- */

const MyAccount = (props) => (
  <div className="container">
    <Row>
      <p className="caption"> My Orders </p>
        <Orders orders={props.orders}/>
    </Row>
    <Row>
      <p className="caption"> My Reviews </p>
        <Collection>
          <CollectionItem href='#'>Review</CollectionItem>
          <CollectionItem href='#'>Review</CollectionItem>
          <CollectionItem href='#'>Review</CollectionItem>
          <CollectionItem href='#'>Review</CollectionItem>
        </Collection>
    </Row>

  </div>
)

/* -------------------<   CONTAINER   >-------------------- */

import {connect} from 'react-redux'

export default connect(
  ({auth}) => {return auth ? {orders: auth.orders, reviews: auth.reviews} : {orders: [], reviews: []}}
)(MyAccount)

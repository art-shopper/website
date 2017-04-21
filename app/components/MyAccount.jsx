import React from 'react'
import {Row, Col, Collection, CollectionItem} from 'react-materialize'

import ProductCard from './ProductCard'

/* -------------------<   COMPONENT   >-------------------- */

const MyAccount = (props) => (
  <div className="container">
    <Row>
      <p className="caption"> My Orders </p>
        <Collection>
          <CollectionItem href='#'>Order #13401591</CollectionItem>
          <CollectionItem href='#'>Order #13401592</CollectionItem>
          <CollectionItem href='#'>Order #13401593</CollectionItem>
          <CollectionItem href='#'>Order #13401594</CollectionItem>
        </Collection>
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
)(MyAccount)

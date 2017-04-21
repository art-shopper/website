import React from 'react'
import {Row, Col, Collection, CollectionItem} from 'react-materialize'

import ProductCard from './ProductCard'

/* -------------------<   COMPONENT   >-------------------- */

const MyAccount = (props) => (
  <div className="container">
    <Row>
        <Collection>
          <CollectionItem href='#'>Alvin</CollectionItem>
          <CollectionItem href='#' active>Alvin</CollectionItem>
          <CollectionItem href='#'>Alvin</CollectionItem>
          <CollectionItem href='#'>Alvin</CollectionItem>
        </Collection>
    </Row>

  </div>
)

/* -------------------<   CONTAINER   >-------------------- */

import {connect} from 'react-redux'

export default connect(
)(MyAccount)

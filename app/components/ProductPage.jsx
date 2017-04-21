import React, { Component } from 'react'

/* -------------------<   COMPONENT   >-------------------- */

const ProductPage = (props) => (
  <div className="container">
    <Row>
      <Col s={4} className='grid-example' key='1'> <ProductCard /> </Col>
      <Col s={4} className='grid-example' key='2'> <ProductCard /> </Col>
      <Col s={4} className='grid-example' key='3'> <ProductCard /> </Col>
    </Row>
    <Row>
      <Col s={4} className='grid-example' key='1'> <ProductCard /> </Col>
      <Col s={4} className='grid-example' key='2'> <ProductCard /> </Col>
       <Col s={4} className='grid-example' key='3'> <ProductCard /> </Col>
    </Row>
  </div>
)

/* -------------------<   CONTAINER   >-------------------- */

import {connect} from 'react-redux'

export default connect(
)(ProductPage)

import React from 'react'
import {Row, Col} from 'react-materialize'

import ProductCard from './ProductCard'

/* -------------------<   COMPONENT   >-------------------- */

const Home = (props) => (
  <div className="container">
    <Row>
       <Col s={12} m={6} l={4} className='grid-example' key='1'> <ProductCard /> </Col>
       <Col s={12} m={6} l={4} className='grid-example' key='2'> <ProductCard /> </Col>
       <Col s={12} m={6} l={4} className='grid-example' key='3'> <ProductCard /> </Col>
       <Col s={12} m={6} l={4} className='grid-example' key='4'> <ProductCard /> </Col>
       <Col s={12} m={6} l={4} className='grid-example' key='5'> <ProductCard /> </Col>
       <Col s={12} m={6} l={4} className='grid-example' key='6'> <ProductCard /> </Col>
    </Row>
  </div>
)

/* -------------------<   CONTAINER   >-------------------- */

import {connect} from 'react-redux'

export default connect(
)(Home)

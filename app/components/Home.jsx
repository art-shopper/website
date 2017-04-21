import React from 'react'
import {Row, Col, Card, CardTitle} from 'react-materialize'

import ProductCard from './ProductCard'

/* -------------------<   COMPONENT   >-------------------- */

const Home = (props) => (
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
)(Home)

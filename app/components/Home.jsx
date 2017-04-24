import React from 'react'
import {Row, Col} from 'react-materialize'

import ProductCard from './ProductCard'

/* -------------------<   COMPONENT   >-------------------- */

const Home = (props) => (
  <div className="container">
    <Row>
      { 
        props.products && props.products.map(product => (
          <Col s={12} m={6} l={4} className='grid-example' key={product.id}>
            <ProductCard product={product}/>
          </Col>
        ))
      }
    </Row>
  </div>
)

/* -------------------<   CONTAINER   >-------------------- */

import {connect} from 'react-redux'

export default connect(
  ({products}) => ({
      products: products.list
    })
)(Home)

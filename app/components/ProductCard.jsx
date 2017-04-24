import React from 'react';
import { Link } from 'react-router'
import { Card, CardTitle } from 'react-materialize';

/* -------------------<   COMPONENT   >-------------------- */

const ProductCard = props => (

  <Card
    className="small hoverable"
    header={
            <Link to={`products/${props.product.id}`}>
              <CardTitle 
              image={props.product.image}>
                {props.product.title}
              </CardTitle>
            </Link>
            }
  >
    {props.product.description}
  </Card>
);



/* -------------------<   CONTAINER   >-------------------- */

import { connect } from 'react-redux';

export default connect(
    (state, {product}) => (
      {
        product
      }
    )
  )(ProductCard);

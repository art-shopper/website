import React from 'react';
import { Link } from 'react-router'
import { Card, CardTitle } from 'react-materialize';

/* -------------------<   COMPONENT   >-------------------- */

const ProductCard = props => (
  <Card
    className="small"
    header={
            <Link to={`products/${props.product.id}`}>
              <CardTitle 
              image="http://media.boingboing.net/wp-content/uploads/2015/10/lovable.jpg">
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

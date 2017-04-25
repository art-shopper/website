import React from 'react'
import {Link} from 'react-router'

import {Row, Col, Collection, CollectionItem} from 'react-materialize'

import Orders from './Orders'
import SingleReview from './SingleReview'


/* -------------------<   COMPONENT   >-------------------- */

class MyAccount extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const props = this.props;
    return (
      <div className="container">
        <Row>
          <p className="caption"> My Orders </p>
            <Orders orders={props.orders}/>
        </Row>
        <Row>
          <p className="caption"> My Reviews </p>
               <Collection>
                    {
                      props.reviews.map(review =>
                      <CollectionItem key={review.id}><SingleReview
                        date={review.created_at.split('T')[0]} // Splits on T to separate out date. example: 2017-04-24T21:26:33.285Z
                        content={review.text}
                        title={review.title}
                        rating={review.rating}
                      />
                      </CollectionItem>)
                    }
               </Collection>
        </Row>
      </div>
    )
  }
}

/* -------------------<   CONTAINER   >-------------------- */

import {connect} from 'react-redux'

export default connect(
  ({auth}) => auth ? {orders: auth.orders, reviews: auth.reviews} : {orders: [], reviews: []}
)(MyAccount)

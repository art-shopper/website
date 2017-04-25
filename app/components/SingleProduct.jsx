import React from 'react';
import {
  Card,
  CardTitle,
  Collection,
  CollectionItem,
  Col,
  Row,
  Button,
  Input
} from 'react-materialize';
import StarRatingComponent from 'react-star-rating-component';
import SingleReview from './SingleReview'

/* -------------------<   COMPONENT   >-------------------- */

class SingleProduct extends React.Component {
   constructor() {
        super();
        this.state = {
            rating: 0
        };
    }
    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
    }
    addToCartClick(product) {
      console.log("product in component", product)
      this.props.addToCart(product)
    }

render () {
  const { rating } = this.state;
  const { image, title, description, year, tags, price, quantity } = this.props.products.selected;
  const joinedTags = tags && tags.join(', ');
  const { list } = this.props.reviews;

  return (
  <div className="container">
    <Row>
      <Col s={12} m={8} l={8}>
        <Card
          header={
            <CardTitle image={image}>
              {title}
            </CardTitle>
          }
        >
        </Card>
      </Col>
      <Col s={12} m={4} l={4}>
        <Collection className="minheight">
          <CollectionItem> <b>Description:</b> {description} </CollectionItem>
          <CollectionItem> <b>Price:</b> {price} </CollectionItem>
          <CollectionItem> <span> <b>Remaining Quantity:</b> {quantity} </span> </CollectionItem>
          <CollectionItem> <b>Year:</b> {year} </CollectionItem>
          <CollectionItem> <b>Tags:</b> {joinedTags} </CollectionItem>
          <Button onClick={this.addToCartClick.bind(this, this.props.products.selected)}>Add to Cart</Button>
        </Collection>
      </Col>
    </Row>
    <Row>
      <Col s={12}>
        <Collection>
            <CollectionItem> <p className="caption"> Reviews </p>
               <Collection>
                    {
                      list.map(review =>
                      <CollectionItem key={review.id}><SingleReview
                        date={review.created_at.split('T')[0]} // Splits on T to separate out date. example: 2017-04-24T21:26:33.285Z
                        content={review.text}
                        title={review.title}
                        rating={review.rating}
                      />
                      </CollectionItem>)
                    }
               </Collection>


            </CollectionItem>

            {/*<Button>Add a review</Button>*/}
            <CollectionItem> <p> New Review </p>

              <form className="col s12" onSubmit={this.submitReview}>
                <div className="row">
                  <div className="input-field col s12 m6 l6">
                    <input id="input_text" type="text" data-length="10" />
                    <label htmlFor="input_text">Give your review a title!</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input id="input_text2" type="text" data-length="10" />
                    <label htmlFor="input_text2">What did you think of the product? (20 chars min)</label>
                  </div>
                </div>

                <div className="rating-container">
                  <span> Overall Rating: </span>
                  <StarRatingComponent
                      name="star-rating"
                      starCount={5}
                      value={rating}
                      onStarClick={this.onStarClick.bind(this)}
                  />
                </div>
                <br />
                <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                  <i className="material-icons right">send</i>
                </button>
              </form>
            </CollectionItem>
          </Collection>
      </Col>
    </Row>
  </div>
  )}
}
/* -------------------<   CONTAINER   >-------------------- */

import { connect } from 'react-redux';
import { addToCart, addProduct } from '../reducers/cart'

export default connect(
  ({ products, reviews }) => ({ products, reviews }),
  ({ addToCart }),
)(SingleProduct)

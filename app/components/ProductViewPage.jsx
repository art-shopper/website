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

/* -------------------<   COMPONENT   >-------------------- */

class ProductViewPage extends React.Component {
   constructor() {
        super();
        this.state = {
            rating: 0
        };
    }
    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
    }

render () {
  const { rating } = this.state;
  return (
  <div className="container">
    <Row>
      <Col s={8}>
        <Card
          header={
            <CardTitle image="http://s.newsweek.com/sites/www.newsweek.com/files/2014/09/29/1003bobrosstoc.jpg">
              Card Title
            </CardTitle>
          }
        >

          <Collection>
            <CollectionItem>year</CollectionItem>
            <CollectionItem>description</CollectionItem>
            <Button>Add a review</Button>
            <CollectionItem>Review 1</CollectionItem>
            <CollectionItem>Review 2</CollectionItem>
            <CollectionItem>Review 3</CollectionItem>
            <CollectionItem>Review 4</CollectionItem>
          </Collection>
        </Card>
      </Col>
      <Col s={4}>
        <Collection className="minheight">
          <CollectionItem> Description </CollectionItem>
          <CollectionItem> Price: $54002 </CollectionItem>
          <CollectionItem> <span> Remaining Quantity: 2 </span> </CollectionItem>
          <CollectionItem> Year </CollectionItem>
          <CollectionItem> Tags </CollectionItem>
          <Button>Add to Cart</Button>
        </Collection>
      </Col>
    </Row>
    <Row>
      <Col s={12}>
        <Collection>
            <CollectionItem>Reviews
               <Collection>
                  <CollectionItem>
                    <p>Insert Review Title Here &nbsp;
                      <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                    </p>
                    <p>Insert Date Created</p>
                    <p>Insert Review Content Here</p>
                  </CollectionItem>
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

export default connect()(ProductViewPage);

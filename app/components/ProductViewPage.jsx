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
            rating: 1
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
      <Col s={8} className="grid-example" key="1" >
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
            <Button right>Add a review</Button>
            <CollectionItem>
              Review 1
              <br />
              <span className="rating-element"> Rating: </span>
              <input className="with-gap" name="group1" type="radio" id="1star" />
                <label htmlFor="1star">1</label>
              <input className="with-gap" name="group1" type="radio" id="2stars" />
                <label htmlFor="2stars">2</label>
              <input className="with-gap" name="group1" type="radio" id="3stars" />
                <label htmlFor="3stars">3</label>
              <input className="with-gap" name="group1" type="radio" id="4stars" />
               <label htmlFor="4stars">4</label>
              <input className="with-gap" name="group1" type="radio" id="5stars" />
                <label htmlFor="5stars">5</label>
              <br />
              <div className="input-field">
                <label htmlFor="textarea1">What did you think of the product? (20 characters minimum)</label>
                <textarea id="textarea1" className="materialize-textarea"></textarea>
              </div>
            </CollectionItem>
            <CollectionItem>Review 2
              <div className="rating-container">
                <br />
                <span className="rating-element"> Rating: </span>
                <i className="material-icons rating-element">star</i>
                <i className="material-icons rating-element">star</i>
                <i className="material-icons rating-element">star</i>
                <i className="material-icons rating-element">star</i>
                <i className="material-icons rating-element">star</i>
              </div>
             </CollectionItem>
            <CollectionItem>
              Rating 3
              <div className="rating">
                <span>☆</span>
                <span>☆</span>
                <span>☆</span>
                <span>☆</span>
                <span>☆</span>
              </div>
            </CollectionItem>
            <CollectionItem>Review 4
            <StarRatingComponent
                    name="rate1"
                    starCount={5}
                    value={rating}
                    onStarClick={this.onStarClick.bind(this)}
                />
                </CollectionItem>

          </Collection>
        </Card>
      </Col>
      <Col s={4} className="grid-example" key="2">
        <Collection>
          <CollectionItem>price</CollectionItem>
          <CollectionItem>
            <label>
              Quantity: <Button floating small className='red' waves='light' icon='add' />
            </label>
          </CollectionItem>
          <Button right>Add a review</Button>
        </Collection>
      </Col>
    </Row>
  </div>
  )}
}
/* -------------------<   CONTAINER   >-------------------- */

import { connect } from 'react-redux';

export default connect()(ProductViewPage);

import React from 'react';
import {
  Card,
  CardTitle,
  Collection,
  CollectionItem,
  Col,
  Row,
  Button
} from 'react-materialize';

/* -------------------<   COMPONENT   >-------------------- */

const ProductViewPage = props => (
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
              <fieldset class="rating">
    <input type="radio" id="star5" name="rating" value="5" /><label className = "full" for="star5" title="5 Stars"></label>
    <input type="radio" id="star4" name="rating" value="4" /><label className = "full" for="star4" title="4 Stars"></label>
    <input type="radio" id="star3" name="rating" value="3" /><label className = "full" for="star3" title="3 Stars"></label>
    <input type="radio" id="star2" name="rating" value="2" /><label className = "full" for="star2" title="2 Stars"></label>
    <input type="radio" id="star1" name="rating" value="1" /><label className = "full" for="star1" title="1 Star"></label>
</fieldset>

            </CollectionItem>
            <CollectionItem>Review 2
              <div className="rating-container">
                <br />
                <span className="rating-element"> Rating: </span>
                <i className="material-icons rating-element">add</i>
                <i className="material-icons rating-element">star</i>

              </div>
             </CollectionItem>
            <CollectionItem>Review 3</CollectionItem>
            <CollectionItem>Review 4</CollectionItem>
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
);
/* -------------------<   CONTAINER   >-------------------- */

import { connect } from 'react-redux';

export default connect()(ProductViewPage);

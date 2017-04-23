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
            <Button>Add a review</Button>
            <CollectionItem>Review 1</CollectionItem>
            <CollectionItem>Review 2</CollectionItem>
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
              Quantity: <Button floating className='red' waves='light' icon='add' />
            </label>
          </CollectionItem>
          <Button>Add a review</Button>
        </Collection>
      </Col>
    </Row>

  </div>
);
/* -------------------<   CONTAINER   >-------------------- */

import { connect } from 'react-redux';

export default connect()(ProductViewPage);

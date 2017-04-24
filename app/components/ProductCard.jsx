import React from 'react';
import { Card, CardTitle } from 'react-materialize';

/* -------------------<   COMPONENT   >-------------------- */

const ProductCard = props => (
  <Card header={<CardTitle reveal image={"https://s-media-cache-ak0.pinimg.com/originals/02/6c/47/026c47ad36933184efcb93dc5767d63b.jpg"} waves='light'/>}
    title="Peaceful Reflections"
    reveal={<p>One of Bob's favorite paintings.
    Tags: mountains, trees, clouds</p>}>
    <p><a href="/products/1">View Details</a></p>
  </Card>
);



/* -------------------<   CONTAINER   >-------------------- */

import { connect } from 'react-redux';

export default connect()(ProductCard);

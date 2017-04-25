import React, { Component } from 'react';
import {Collection, CollectionItem} from 'react-materialize';

/* -------------------<   COMPONENT   >-------------------- */

export default (props) => (
    <Collection>
      { 
        props.orders && props.orders.map(order => (
          <CollectionItem key={order.id}>
            {order.id}
          </CollectionItem>
        ))
      }
    </Collection>
);


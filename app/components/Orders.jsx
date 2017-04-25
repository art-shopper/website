import React, { Component } from 'react';
import {Collection, CollectionItem} from 'react-materialize';
import {Link} from 'react-router'

/* -------------------<   COMPONENT   >-------------------- */

export default (props) => (
    <Collection>
      { 
        props.orders && props.orders.map(order => (
          <CollectionItem key={order.id}>
            <Link to={`/orders/${order.id}`}>#{order.id}</Link>
          </CollectionItem>
        ))
      }
    </Collection>
);


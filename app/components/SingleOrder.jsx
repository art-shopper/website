import React from 'react'
import {} from 'react-materialize'
import { Link } from 'react-router'
import { intToUSD } from '../utils'

/* -------------------<   COMPONENT   >-------------------- */

const SingleOrder = (props) => {
  console.log(props.order);
 return  (
    <div className="container">
    {props.order && (
      <div>
       <h4><b> Order #{props.order.id} </b></h4>
       <p className="ordercaption"> <b>Order Date:</b> {props.order.date_fulfilled} </p>
       <p className="ordercaption"> <b>Order Status:</b> {props.order.status} </p>
      </div>
     )}
      <table>
        <thead>
          <tr>
              <th>Picture</th>
              <th>Item Name</th>
              <th>Item Price</th>
              <th>Quantity</th>
          </tr>
        </thead>

        <tbody>
          {props.orderItems && props.orderItems.map(orderItem => (
              <tr key={orderItem.id}>
                <td><img className="thumb" src={orderItem.product.image}/></td>
                <td><Link to={`/products/${orderItem.product.id}`}>{orderItem.product.title}</Link></td>
                <td>{intToUSD(orderItem.current_price)}</td>
                <td>{orderItem.quantity}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <p className="caption"> Total price: 
        { props.orderItems && 
          " " + intToUSD(props.orderItems.reduce((acc, ele) => {return acc + ele.current_price * ele.quantity}, 0)) } 
      </p>

    </div>
)
}
/* -------------------<   CONTAINER   >-------------------- */

import {connect} from 'react-redux'

export default connect(
  ({orders}) => ({orderItems: orders.selected.orderItems, order: orders.selected.order})
)(SingleOrder)

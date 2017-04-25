import React from 'react'
import {} from 'react-materialize'
import { Link } from 'react-router'
import { intToUSD } from '../utils'

/* -------------------<   COMPONENT   >-------------------- */

const SingleOrder = (props) => {
 return  (
    <div className="container">
     <p className="caption"> Order #13401591 </p>
     <p className="caption"> Order Date: 04/10/2017, 7:40pm </p>
     <p className="caption"> Order Status: Shipped </p>
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

      <p className="caption"> Total price: $10.67 </p>

    </div>
)
}
/* -------------------<   CONTAINER   >-------------------- */

import {connect} from 'react-redux'

export default connect(
  ({orders}) => {console.log(orders);return{orderItems: orders.selected}}
)(SingleOrder)

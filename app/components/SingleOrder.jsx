import React from 'react'
import {} from 'react-materialize'

/* -------------------<   COMPONENT   >-------------------- */

const SingleOrder = (props) => (
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
              <th>Link to Item</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Picture here</td>
            <td>Eclair</td>
            <td>$0.87</td>
            <td>1</td>
            <td>Button</td>
          </tr>
          <tr>
            <td>Picture here</td>
            <td>Jellybean</td>
            <td>$3.76</td>
            <td>1</td>
            <td>Button</td>
          </tr>
          <tr>
            <td>Picture here</td>
            <td>Lollipop</td>
            <td>$7.00</td>
            <td>1</td>
            <td>Button</td>
          </tr>
        </tbody>
      </table>

      <p className="caption"> Total price: $10.67 </p>

    </div>
)

/* -------------------<   CONTAINER   >-------------------- */

import {connect} from 'react-redux'

export default connect(
)(SingleOrder)

import React from 'react'
import {Link} from 'react-router'
import {Button} from 'react-materialize'

/* -------------------<   COMPONENT   >-------------------- */

const Cart = (props) => {
  console.log(props)
 return  (
    <div className="container">
     <p className="caption"> My Cart </p>
      <table>
        <thead>
          <tr>
              <th>Picture</th>
              <th>Item Name</th>
              <th>Item Price</th>
              <th>Quantity</th>
              <th>Edit/Delete</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Alvin</td>
            <td>Eclair</td>
            <td>$0.87</td>
            <td>1</td>
            <td>Button</td>
          </tr>
          <tr>
            <td>Alan</td>
            <td>Jellybean</td>
            <td>$3.76</td>
            <td>1</td>
            <td>Button</td>
          </tr>
          <tr>
            <td>Jonathan</td>
            <td>Lollipop</td>
            <td>$7.00</td>
            <td>1</td>
            <td>Button</td>
          </tr>
        </tbody>
      </table>

      <Button><Link to="/checkout" style={{color:'white'}}>Checkout</Link></Button>
    </div>
)
}

/* -------------------<   CONTAINER   >-------------------- */

import {connect} from 'react-redux'

const mapToState = (state) => {
  console.log('state in connect', state)
  return {
    cart: state.cart,
    products: state.products,
  }
}


export default connect(mapToState)(Cart)

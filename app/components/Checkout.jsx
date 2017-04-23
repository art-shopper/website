import React from 'react'
import {Input} from 'react-materialize'

/* -------------------<   COMPONENT   >-------------------- */

const Checkout = (props) => (
    <div className="container">
     <p className="caption"> Checkout </p>
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

      <form onSubmit={evt => {
        evt.preventDefault()
        browserHistory.push('/')
      } }>
        <Input name="email" label="Email" s={12}  />
        <Input name="address" label="Address" s={12} />
        <Input type="submit" value="Finish Checkout" />
      </form>

    </div>
)

/* -------------------<   CONTAINER   >-------------------- */

import {connect} from 'react-redux'

export default connect(
)(Checkout)

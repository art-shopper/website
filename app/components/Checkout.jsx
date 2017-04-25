import React from 'react'
import {Input, Button} from 'react-materialize'
import {Link} from 'react-router'

/* -------------------<   COMPONENT   >-------------------- */

const Checkout = (props) => {
  console.log(props)
    const cart = props.cart.list;
    const eachProduct = cart.map((item) => {
      return (
        <tr>
          <td> <img className="thumb" src={item.image} /></td>
          <td>{item.title}</td>
          <td>{+item.price}</td>
          <td>{item.quantity} </td>
          <td><Button><Link to="/cart" style={{ color: 'white' }} >Edit</Link></Button> </td>
        </tr>
      )
    })
return (
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
         {eachProduct}
        </tbody>
      </table>

      <p className="caption"> Total price: $10.67 </p>

      <form onSubmit={evt => {
        evt.preventDefault()
        toastr.success('Added to Cart!')
        browserHistory.push('/')
      } }>
        <Input name="email" label="Email" s={12}  />
        <Input name="address" label="Address" s={12} />
        <button style={{margin: 10}} className="btn waves-effect waves-light" type="submit" name="action" value="Checkout">Finish Checkout
        <i className="material-icons right">shopping_cart</i>
        </button>
      </form>

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

export default connect(mapToState
)(Checkout)

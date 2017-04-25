import React from 'react'
import { Link } from 'react-router'
import { Button, Input, Row, Icon } from 'react-materialize'
import {browserHistory} from 'react-router'

/* -------------------<   COMPONENT   >-------------------- */

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onDeleteClick(product_id) {
    this.props.removeItem(product_id)
  }

  onSubmitClick(evt) {
    // console.log('props on props', this.props.cart.list)
    const cart = this.props.cart.list;

    this.props.placeOrder({
      orderItems: cart.map(item => (
        {
          product_id: item.product.id,
          quantity: item.quantity,
          current_price: item.product.price,
        })),
      email: this.props.auth.email ? null : evt.target.email.value
    })
    evt.preventDefault()
    browserHistory.push('/')
  }

  render() {
    // console.log('props', this.props)
    const cart = this.props.cart.list;
    const eachProduct = cart.map((item) => {
      return (
        <tr>
          <td> <img className="thumb" src={item.product.image} /></td>
          <td>{item.product.title}</td>
          <td>{+item.product.price}</td>
          <td>{item.quantity} </td>
          <td>{item.quantity * item.product.price}</td>
          <td><Button floating icon='mode_edit' className='green' /><Button onClick={this.onDeleteClick.bind(this, this.props.id)} floating icon='delete' className='red' /></td>
        </tr>
      )
    })
    return (
      <div className="container">
        <h5> My Cart </h5>
        <table>
          <thead>
            <tr>
              <th>Picture</th>
              <th>Item Name</th>
              <th>Item Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>

          <tbody>
            {eachProduct}
          </tbody>
        </table>

      {/*<Button><Link to="/checkout" style={{ color: 'white' }}>Checkout</Link></Button>*/}
      <br /><hr />
      <div className="checkoutForm">
      <br />
        <div>
          <h5> Checkout Information </h5>
         </div>

        <form
          onSubmit={this.onSubmitClick.bind(this) }>

          <Input name="name" label="Name" s={12}  />
          <Input name="email" label="Email" s={12}  />
          <Input name="address" label="Shipping Address" s={12} />
          <Input type="submit" value="Finish Checkout" />
        </form>
        </div>
      </div>
    )

  }
}

/* -------------------<   CONTAINER   >-------------------- */

import { connect } from 'react-redux'
import { removeItem, placeOrder } from '../reducers/cart'

const mapToState = (state) => {
  console.log('state in connect', state)
  return {
    cart: state.cart,
    products: state.products,
    auth: state.auth
  }
}


export default connect(mapToState, ({ removeItem, placeOrder }))(Cart)

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
    const cart = this.props.cart.list;
    cart.map((item) => {
      console.log(this.props)
      return this.props.placeOrder(item)
    })
    evt.preventDefault()
    // browserHistory.push('/')
  }

  render() {
    console.log('props', this.props)
    const cart = this.props.cart.list;
    const eachProduct = cart.map((item) => {
      return (
        <tr>
          <td> <img className="thumb" src={item.image} /></td>
          <td>{item.title}</td>
          <td>{+item.price}</td>
          <td>{item.quantity} </td>
          <td>{item.quantity * item.price}</td>
          <td><Button floating icon='mode_edit' className='green' /><Button onClick={this.onDeleteClick.bind(this, this.props.id)} floating icon='delete' className='red' /></td>
        </tr>
      )
    })
    return (
      <div className="container">
        <p className="caption"> My Cart </p>
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
          <h4> Checkout Information </h4>
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
  }
}


export default connect(mapToState, ({ removeItem, placeOrder }))(Cart)

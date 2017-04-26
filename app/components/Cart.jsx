import React from 'react'
import { Link, browserHistory} from 'react-router'
import { Button, Input, Row, Icon } from 'react-materialize'
import { intToUSD } from '../utils'

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
    toastr.success(`Success! Your product(s) will arrive within 5-7 business days. Your email confirmation has been sent to ${evt.target.email.value}.`)
  }

  render() {
    // console.log('props', this.props)
    const cart = this.props.cart.list;
    const eachProduct = cart.map((item) => {
      return (
        <tr key={item.id}>
          <td className="mobile-hide"> <img className="thumb" src={item.product.image} /></td>
          <td>{item.product.title}</td>
          <td className="mobile-hide">{intToUSD(+item.product.price)}</td>
          <td>{item.quantity} </td>
          <td>{intToUSD(item.quantity * item.product.price)}</td>
          <td><Button floating icon='mode_edit' className='green' /></td>
          <td><Button onClick={this.onDeleteClick.bind(this, this.props.id)} floating icon='delete' className='red' /></td>
        </tr>
      )
    })
    return (
      <div className="container">
        <h5> My Cart </h5>
        <table>
          <thead>
            <tr>
              <th className="mobile-hide">Picture</th>
              <th>Item Name</th>
              <th className="mobile-hide">Item Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {eachProduct}
          </tbody>
          <p className="caption"> Total price:
            { " " + intToUSD(cart.reduce((acc, item) => {return acc + item.product.price * item.quantity}, 0)) }
          </p>
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
          { !this.props.auth && 
            <Input name="email" label="Email" s={12} validate type="email" required />
          }
          <button style={{marginTop: 20}} className="btn waves-effect waves-light" type="submit" name="action" value="Checkout">Finish Checkout
          <i className="material-icons right">shopping_cart</i>
          </button>
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
  return {
    cart: state.cart,
    products: state.products,
    auth: state.auth
  }
}


export default connect(mapToState, ({ removeItem, placeOrder }))(Cart)

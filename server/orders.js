'use strict'

const db = require('APP/db')

const Order = db.model('orders')
const OrderItem = db.model('orderItems')

const {mustBeLoggedIn, forbidden, selfOnly} = require('./auth.filters')

module.exports = require('express').Router()
  // get all orders - only admins can do this. normal users are blocked
  .get('/',
    forbidden('listing orders is not allowed'),
    (req, res, next) =>
      Order.findAll()
        .then(orders => res.json(orders))
        .catch(next))
  // order creation happens after a user completes a purchase while items are in cart
  // this creates a new order in the database
  // if the user_id is not present, this means they are a guest.
  // we collect emails from both guests and authenticated users
  // after a order is created, we create all of the individual items in the OrderItem database
  .post('/',
    (req, res, next) =>{
      console.log('user',req.body)
      return(
        Order.create({
        date_fulfilled: Date.now(),
        email: req.body.email ? req.body.email : req.user.email,
        user_id: req.body.email ? null : req.user.id,
      })
       .then(createdOrder => Promise.all(req.body.orderItems.map(item => createdOrder.createOrderItem(item)))) // fix the name of the model
      .then(() => res.sendStatus(201))
      .catch(next))
    })


  // get one order - only admins can do this. normal users are blocked
  .get('/:id',
    forbidden('Unauthorize access.'),
    (req, res, next) =>
      OrderItem.findAll({
        where: {
          order_id: req.params.id,
        }
      })
      .then(order => res.json(order))
      .catch(next))
  // update one order - only a user that's updating their own order can do that.
  .put('/:id',
    selfOnly,
    (req, res, next) =>
      Order.findById(req.params.id)
      .then(order => order.updateAttributes(req.body))
      .catch(next))
  // delete one order - only admins can do this
  .delete('/:id',
    forbidden('deleting orders is not allowed'),
    (req, res, next) =>
      Order.findById(req.params.id)
      .then(order => order.destroy())
      .catch(next))

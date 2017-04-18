'use strict'

const db = require('APP/db')

const Order = db.model('orders')
const OrderItem = db.model('order_items')

const {mustBeLoggedIn, forbidden, selfOnly} = require('./auth.filters')

module.exports = require('express').Router()
  .get('/',
    // The forbidden middleware will fail *all* requests to list users.
    // Remove it if you want to allow anyone to list all users on the site.
    //
    // If you want to only let admins list all the users, then you'll
    // have to add a role column to the users table to support
    // the concept of admin users.
    forbidden('listing orders is not allowed'),
    (req, res, next) =>
      Order.findAll()
        .then(orders => res.json(orders))
        .catch(next))
  .post('/',
    (req, res, next) =>
      Order.create({
        date_fulfilled: req.body.date,
        email: req.body.email ? req.body.email : req.user.email,
        user_id: req.body.email ? null : req.user.id
      })
      .then(createdOrder => {
        return OrderItem.bulkCreate(req.body.orderItems)
      })
      .then(orderItems => res.status(201).json(orderItems))
      .catch(next))
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
  .put('/:id',
    selfOnly,
    (req, res, next) =>
      Order.findById(req.params.id)
      .then(order => order.updateAttributes(req.body))
      .catch(next))
  .delete('/:id',
    forbidden('deleting orders is not allowed'),
    (req, res, next) =>
      Order.findById(req.params.id)
      .then(order => order.destroy())
      .catch(next))

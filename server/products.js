'use strict'

const db = require('APP/db')

const Product = db.model('products')

const {mustBeLoggedIn, forbidden, selfOnly} = require('./auth.filters')

module.exports = require('express').Router()
  .get('/',
    // The forbidden middleware will fail *all* requests to list users.
    // Remove it if you want to allow anyone to list all users on the site.
    //
    // If you want to only let admins list all the users, then you'll
    // have to add a role column to the users table to support
    // the concept of admin users.
    (req, res, next) =>
      Product.findAllWithOffset(req.query.offset || 0)
        .then(products => res.json(products))
        .catch(next))
  .get('/search', 
    (req, res, next) => 
      Product.searchWithOffset(req.body.searchTags, req.query.offset || 0)
      .then(products => res.json(products))
      .catch(next))
  .post('/', 
    forbidden("adding products is not allowed"),
    (req, res, next) =>
      Product.create(req.body)
      .then(createdProduct => res.status(201).json(createdProduct))
      .catch(next))
  .get('/:id',
    (req, res, next) =>
      Product.findById(req.params.id)
      .then(product => res.json(product))
      .catch(next))
  .put('/:id',
    forbidden("adjusting products is not allowed"),
    (req, res, next) =>
      Product.findById(req.params.id)
      .then(product => product.updateAttributes(req.body))
      .catch(next))
  .delete('/:id',
    forbidden('deleting products is not allowed'),
    (req, res, next) =>
      Product.findById(req.params.id)
      .then(product => product.destroy())
      .catch(next))
  .get('/:id/reviews',
    (req, res, next) =>
      Product.getReviewsWithOffset(req.query.offset)
      .then(reviews => res.json(reviews))
      .catch(next))

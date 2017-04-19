'use strict';

const db = require('APP/db');

const Product = db.model('products');

const {mustBeLoggedIn, forbidden, selfOnly} = require('./auth.filters');

module.exports = require('express').Router()
  // get a number of products based on offset
  .get('/',
    (req, res, next) =>
      Product.findAllWithOffset(req.query.offset || 0)
        .then(products => res.json(products))
        .catch(next))
  // get a number of products based on offset and search tags
  .get('/search',
    (req, res, next) =>
      Product.searchWithOffset(req.body.tags, req.query.offset || 0)
      .then(products => res.json(products))
      .catch(next))
  // add a product to db (admin only)
  .post('/',
    forbidden('adding products is not allowed'),
    (req, res, next) =>
      Product.create(req.body)
      .then(createdProduct => res.status(201).json(createdProduct))
      .catch(next))
  // get info for a single product
  .get('/:id',
    (req, res, next) =>
      Product.findById(req.params.id)
      .then(product => res.json(product))
      .catch(next))
  // adjust attributes of a product (admin only)
  .put('/:id',
    forbidden('adjusting products is not allowed'),
    (req, res, next) =>
      Product.findById(req.params.id)
      .then(product => product.updateAttributes(req.body))
      .catch(next))
  // delete a product (admin only)
  .delete('/:id',
    forbidden('deleting products is not allowed'),
    (req, res, next) =>
      Product.findById(req.params.id)
      .then(product => product.destroy())
      .catch(next))
  // get all the reviews for a product with an offset
  .get('/:id/reviews',
    (req, res, next) =>
      Product.getReviewsWithOffset(req.query.offset)
      .then(reviews => res.json(reviews))
      .catch(next));

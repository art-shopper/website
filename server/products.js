'use strict';

const db = require('APP/db');

const Product = db.model('products');

const {mustBeLoggedIn, forbidden, selfOnly} = require('./auth.filters');

module.exports = require('express').Router()
  // get a number of products based on offset and search
  .get('/',
    (req, res, next) =>
{   console.log(req.query);   
    return Product.searchWithOffset(req.query.searchStr, +req.query.offset)
        .then(products => res.json(products))
        .catch(next)})
  // get up to 6 products for the front page
  // TODO: get top bought products?
  .get('/homepage',
    (req,res,next) =>
      Product.findAll({limit: 6})
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

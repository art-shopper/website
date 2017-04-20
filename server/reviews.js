'use strict'

const db = require('APP/db')
const Review = db.model('reviews')

const { mustBeLoggedIn, forbidden, selfOnly } = require('./auth.filters')

module.exports = require('express').Router()
// get all reviews
  .get('/',
    (req, res, next) =>
      Review.findAll()
        .then(allReviews => res.json(allReviews))
        .catch(next))
// get specific review by review.id
  .get('/:id',
    (req, res, next) =>
      Review.findById(req.params.id)
      .then(review => res.json(review))
      .catch(next))
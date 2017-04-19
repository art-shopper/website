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
// add a new review
  // OB/YP: POST /api/reviews/add/:productId is not quite standard
  // OB/YP: consider auth-ing this, so only users (or only users that have bought the thing maybe)
  .post('/add/:productId',
    (req, res, next) =>
      Review.create({
        title: req.body.title,
        text: req.body.text,
        rating: req.body.rating,
        // user_id: req.user.id,
        // product_id: req.params.id
      })
      .then((createdReview) => res.status(201).json(createdReview))
      .catch(next))
// get all reviews for a specific product
  // OB/YP: isn't this redundant with line 52 over in products.js
  .get('/product/:productId',
    (req, res, next) =>
      Review.findAll({
        where: {
          product_id: req.params.productId
        }
      })
      .then(reviews => res.json(reviews))
      .catch(next))
// get all reviews for a specific user
  // OB/YP: a little non-standard, because the user is not a sub-resource of the review, nor is the user the thing being responded with
  .get('/user/:userId',
    (req, res, next) =>
      Review.findAll({
        where: {
          user_id: req.params.userId
        }
      })
      .then(reviews => res.json(reviews))
      .catch(next))

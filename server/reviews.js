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
  .get('/user/:userId',
    (req, res, next) =>
      Review.findAll({
        where: {
          user_id: req.params.userId
        }
      })
      .then(reviews => res.json(reviews))
      .catch(next))

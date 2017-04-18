'use strict'

const db = require('APP/db')
const User = db.model('orders')

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
      User.findAll()
        .then(users => res.json(users))
        .catch(next))
  .post('/',
    (req, res, next) =>
      User.create(req.body)
      .then(user => res.status(201).json(user))
      .catch(next))
  .get('/:id',
    mustBeLoggedIn,
    (req, res, next) =>
      User.findById(req.params.id)
      .then(user => res.json(user))
      .catch(next))
  .put('/:id',
    selfOnly,
    (req, res, next) => 
      User.findById(req.params.id)
      .then(user => user.updateAttributes(req.body))
      .catch(next))
  .delete('/:id',
    forbidden('deleting users is not allowed'),
    (req, res, next) => 
      User.findById(req.params.id)
      .then(user => user.destroy())
      .catch(next))

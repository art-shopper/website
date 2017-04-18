'use strict'

const db = require('APP/db')
const Order = db.model('orders')

const {mustBeLoggedIn, forbidden, selfOnly} = require('./auth.filters')

module.exports = require('express').Router()


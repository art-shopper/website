'use strict'

const {DATE, STRING} = require('sequelize')

module.exports = db => db.define('orders', {
  date_fulfilled: DATE,
  email: STRING
})

module.exports.associations = (Order, {User}) => {
  Order.belongsTo(User)
}
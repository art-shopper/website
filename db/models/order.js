'use strict'

const {DATE} = require('sequelize')

module.exports = db => db.define('orders', {
  date_fulfilled: DATE,
})

module.exports.associations = (Order, {User}) => {
  Order.belongsTo(User, {foreignKey: "email"})
}

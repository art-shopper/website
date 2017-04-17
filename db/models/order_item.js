'use strict'

const {STRING, INTEGER, ARRAY} = require('sequelize')

module.exports = db => db.define('order_items', {
  quantity: INTEGER,
  current_price: INTEGER,
})

module.exports.associations = (OrderItem, {Order, Product}) => {
  OrderItem.belongsTo(Order)
  OrderItem.belongsTo(Product)
}

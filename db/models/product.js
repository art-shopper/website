'use strict'

const {STRING, INTEGER, ARRAY} = require('sequelize')

module.exports = db => db.define('products', {
  title: {
    type: STRING,
    allowNull: false
  },
  description: STRING,
  year: INTEGER,
  image: STRING,
  price: INTEGER,
  quantity: INTEGER,
  tags: ARRAY(STRING)
})

module.exports.associations = (Product, {Review, OrderItem}) => {
  Product.hasMany(Review);
  Product.hasMany(OrderItem);
}

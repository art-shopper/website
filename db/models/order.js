'use strict';

const {DATE, STRING} = require('sequelize');

module.exports = db => db.define('orders', {
  // OB/YP: a field for status like "shipped", "dropped in a bucket"
  date_fulfilled: DATE, // OB/YP: could default to NOW
  email: STRING // OB/YP: consider isEmail validator, consider making it required
});

module.exports.associations = (Order, {User, OrderItem}) => {
  Order.belongsTo(User);
  Order.hasMany(OrderItem);
};

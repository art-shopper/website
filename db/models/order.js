'use strict';

const {DATE, STRING} = require('sequelize');

module.exports = db => db.define('orders', {
  date_fulfilled: {
    type: DATE,
    defaultValue: Date.now()
  },
  email: {
    type: STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    }
  },
  status: {
    type: STRING,
    defaultValue: "Pending"
  },
});

module.exports.associations = (Order, {User, OrderItem}) => {
  Order.belongsTo(User);
  Order.hasMany(OrderItem);
};

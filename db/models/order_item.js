'use strict'

const {STRING, INTEGER, ARRAY} = require('sequelize')

module.exports = db => db.define('orderItems', {
  quantity: {
    type: INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  current_price: INTEGER
},
{
  defaultScope: {
    include: {
      all:true
    }
  }
}
)

module.exports.associations = (OrderItem, {Order, Product}) => {
  OrderItem.belongsTo(Order)
  OrderItem.belongsTo(Product)
}

'use strict'

const {STRING, INTEGER, TEXT} = require('sequelize')

module.exports = db => db.define('reviews', {
  title: STRING,
  text: TEXT,
  rating: {
    type: INTEGER,
    validate: {
      min: 1,
      max: 5
    }
  }
})

module.exports.associations = (Review, {User, Product}) => {
  Review.belongsTo(User)
  Review.belongsTo(Product)
}

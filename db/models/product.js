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
}, {
  classMethods: {
    /***** 
      Class methods to deal with getting products with offsets.
    *****/
    findAllWithOffset(offset){
      this.findAll({offset});
    },
    // tags is an array of strings
    searchWithOffset(tags, offset){
      this.findAll({offset, where: {tags: {$contains: tags}}})
    }
  }
})

module.exports.associations = (Product, {Review, OrderItem}) => {
  Product.hasMany(Review);
  Product.hasMany(OrderItem);
}

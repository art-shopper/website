'use strict'

const {STRING, INTEGER, ARRAY, DECIMAL} = require('sequelize');
const {PRODUCT_REVIEW_LIMIT, PRODUCT_LIMIT} = require('./constants');

module.exports = db => db.define('products', {
  title: {
    type: STRING,
    allowNull: false
  },
  description: {
    type: STRING,
    allowNull: false
  },
  year: INTEGER,
  image: {
    type: STRING,
    defaultValue: "http://s.newsweek.com/sites/www.newsweek.com/files/2014/09/29/1003bobrosstoc.jpg"
  },
  price: {
    type: DECIMAL(10, 2),
    allowNull: false
  },  
  quantity: {
    type: INTEGER,
    allowNull: false
  },
  tags: {
    type: ARRAY(STRING),
    allowNull: false,
    validate: {
      notEmpty: true
    } 
  }
}, {
  classMethods: {
    /***** 
      Class methods to deal with getting products with offsets.
    *****/
    findAllWithOffset(offset){
      return this.findAll({limit: PRODUCT_LIMIT, offset});
    },
    // tags is an array of strings
    searchWithOffset(tags, offset){
      return this.findAll({limit: PRODUCT_LIMIT, offset, where: {tags: {$contains: tags}}})
    }
  },
  instanceMethods: {
    /*****
      Instance methods to get all the products.
    *****/
    getReviewsWithOffset(offset) {
      return this.getReviews({limit: PRODUCT_REVIEW_LIMIT, offset});
    }
  }
})

module.exports.associations = (Product, {Review, OrderItem}) => {
  Product.hasMany(Review);
  Product.hasMany(OrderItem);
}

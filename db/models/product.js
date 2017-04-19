'use strict'

const {STRING, INTEGER, ARRAY, DECIMAL} = require('sequelize');
const {PRODUCT_REVIEW_LIMIT, PRODUCT_LIMIT} = require('./constants');

module.exports = db => db.define('products', {
  // OB/YP: consider unique validator here, also watch out for empty strings
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
    // OB/YP: consider isUrl validator in sequelize
  },
  price: { // OB/YP: consider using INTEGER instead, to avoid floating point math horror
    type: DECIMAL(10, 2),
    allowNull: false
  },  
  // OB/YP: consider min validation (0)
  quantity: {
    type: INTEGER,
    allowNull: false
  },
  tags: {
    // OB/YP: if you're worried about query performance searching tags, consider indexing it
    type: ARRAY(STRING),
    allowNull: false,
    validate: {
      notEmpty: (value) => { if (value.length < 1) throw new Error("Must have a tag"); }
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

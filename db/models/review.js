'use strict';

const {STRING, INTEGER, TEXT} = require('sequelize');

module.exports = db => db.define('reviews', {
  title: {
    type: STRING,
    allowNull: false,
  },
  text: {
    type: TEXT,
    allowNull: false,
    validate: {
      minLength: function(value) {
        if (value.length < 20) {
          throw new Error('Review must have at least 20 characters');
        }
      }
    }
  },
  rating: {
    type: INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  }
});

module.exports.associations = (Review, {User, Product}) => {
  Review.belongsTo(User)
  // Review.belongsTo(Product, {foreignKey: {allowNull: false}, onDelete: 'CASCADE'});
};

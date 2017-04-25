'use strict';

// bcrypt docs: https://www.npmjs.com/package/bcrypt
const bcrypt = require('bcryptjs')
    , {STRING, VIRTUAL, BOOLEAN} = require('sequelize')

module.exports = db => db.define('users', {
  first_name: STRING,
  last_name: STRING,
  is_admin: {
    type: BOOLEAN,
    defaultValue: false,
  },
  address: STRING,
  email: {
    type: STRING,
    validate: {
      isEmail: true,
      notEmpty: true,
    }
  },

  // We support oauth, so users may or may not have passwords.
  password_digest: STRING, // This column stores the hashed password in the DB, via the beforeCreate/beforeUpdate hooks
  password: VIRTUAL // Note that this is a virtual, and not actually stored in DB
}, {
  indexes: [{fields: ['email'], unique: true}],
  hooks: {
    beforeCreate: setEmailAndPassword,
    beforeUpdate: setEmailAndPassword,
  },
  defaultScope: {
    include: {all:true}
  },
  instanceMethods: {
    // This method is a Promisified bcrypt.compare
    authenticate(plaintext) {
      return new Promise((resolve, reject) =>
        bcrypt.compare(plaintext, this.password_digest,
          (err, result) =>
            err ? reject(err) : resolve(result))
        )
    },
    getOrdersWithOffset(offset = 0) {
      return this.getOrders({limit: 1, offset});
    },
    getReviewsWithOffset(offset = 0) {
      return this.getReviews({limit: 1, offset});
    }
  }
})

module.exports.associations = (User, {OAuth, Order, Review}) => {
  User.hasOne(OAuth)
  User.hasMany(Order)
  User.hasMany(Review, {foreignKey: {allowNull: false}, onDelete: 'CASCADE'})
  // User.addScope('scoperino', 
  //   () => ({defaultScope:true, include: [{model: 'reviews'}, {model: 'orders'}]}),
  //   {override: true})
}

function setEmailAndPassword(user) {
  user.email = user.email && user.email.toLowerCase()
  if (!user.password) return Promise.resolve(user)

  return new Promise((resolve, reject) =>
    bcrypt.hash(user.get('password'), 10, (err, hash) => {
      if (err) return reject(err)
      user.set('password_digest', hash)
      resolve(user)
    })
  )
}

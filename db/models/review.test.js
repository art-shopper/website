'use strict'

const db = require('APP/db')
    , {Review, User, Product} = db
    , {expect} = require('chai')

/* global describe it before afterEach */

describe.only('Review', () => {
  before('Await database sync', () => db.didSync)
  afterEach('Clear the tables', () => db.truncate({ cascade: true }))

  describe('validations', () => {
    let testUser;
    beforeEach('Create a user and reviews from that user', () => {
      return User.create({id: 20, email:"omri@omri.omri"})
      .then(user => testUser = user)
    })

    // TEST OUR REVIEWS
    it('creates review if valid', () => {
      return testUser.createReview({title: "Valid Review", text: "We have at least twenty characters", rating: 3, productId: 1})
      .then(review => expect(review.id).to.be.a('number'))
    })

    it('does not create review if text is blank', () => {
      return testUser.createReview({title: "No Text; Should Fail", rating: 1, productId: 1})
      .catch(err => expect(err.message).to.eql('notNull Violation: text cannot be null'))
    })

    it('does not create review if text is less than 20 characters', () => {
      return testUser.createReview({title: "Invalid Review", text: "Too few characters", rating: 2, productId: 1})
      .catch(err => expect(err.message).to.eql('Validation error: Review must have at least 20 characters'))
    })

    it('does not create review if rating is blank', () => {
      return testUser.createReview({title: "Invalid Review", text: "This is an invalid rating because the rating is null", productId: 1})
      .catch(err => expect(err.message).to.eql('notNull Violation: rating cannot be null'))
    })

    // THIS TEST SHOULD NOT BE PASSING: Due to lack of product_id foreign key
    it('does not create review if there is no product attached', () => {
      return testUser.createReview({title: "Invalid Review", text: "This review has no product_id foreignKey", rating: 4})
      .then(thing => console.log(thing))
      .catch(err => expect(err.message).to.eql('Validation error: Valid'))
    })

  })
})

'use strict'

const db = require('APP/db')
    , {User} = db
    , {expect} = require('chai')

/* global describe it before afterEach */

describe('User', () => {
  before('Await database sync', () => db.didSync)
  afterEach('Clear the tables', () => db.truncate({ cascade: true }))

  describe('authenticate(plaintext: String) ~> Boolean', () => {
    it('resolves true if the password matches', () =>
      User.create({ password: 'ok' })
        .then(user => user.authenticate('ok'))
        .then(result => expect(result).to.be.true))

    it("resolves false if the password doesn't match", () =>
      User.create({ password: 'ok' })
        .then(user => user.authenticate('not ok'))
        .then(result => expect(result).to.be.false))
  })

  describe('class methods', () => {
    let user1, user2, user3;
    beforeEach('Create a user', () => {
      return Promise.all([
        User.create({id: 420, email:"peporoniandchease@gmail.com"})
        .then(user => user1 = user),
        User.create({id: 421, email:"peporoni@gmail.com"})
        .then(user => user2 = user),
        User.create({id: 422, email:"chease@gmail.com"})
        .then(user => user3 = user)
      ])
      .then(() => user1.createOrder())
      .then(() => user2.createOrder())
      .then(() => user2.createOrder())
      .then(() => user2.createOrder({email: "crapshoot@gmail.com"}))
      .then(() => user2.createOrder())
      .then(() => user2.createOrder())
      .then(() => user1.createReview())
      .then(() => user2.createReview())
      .then(() => user2.createReview({title: "The Ross", text: "This guy's afro is crazy!!!", rating: 5}))
    })

    // TEST OUR USERS' ORDERS
    it('returns none if no orders', () => {
      return user3.getOrdersWithOffset(0)
      .then(orders => expect(orders).to.be.length(0))
    })

    it('returns one if there is an order', () => {
      return user1.getOrdersWithOffset(0)
      .then(orders => expect(orders).to.be.length(1))
    })

    it('returns nothing if offset is higher than total number', () => {
      return user1.getOrdersWithOffset(3)
      .then(orders => expect(orders).to.be.length(0))
    })

    it('returns orders from the offset', () => {
      return user2.getOrdersWithOffset(2)
      .then(orders => expect(orders[0].email).to.equal("crapshoot@gmail.com"))
    })

    // TEST OUR USERS' REVIEWS
    it('returns none if no reviews', () => {
      return user3.getReviewsWithOffset(0)
      .then(reviews => expect(reviews).to.be.length(0))
    })

    it('returns one if there is an review', () => {
      return user1.getReviewsWithOffset(0)
      .then(reviews => expect(reviews).to.be.length(1))
    })

    it('returns nothing if offset is higher than total number', () => {
      return user1.getReviewsWithOffset(3)
      .then(reviews => expect(reviews).to.be.length(0))
    })

    it('returns reviews from the offset', () => {
      return user2.getReviewsWithOffset(1)
      .then(reviews => expect(reviews[0].title).to.equal("The Ross"))
    })

  })
})

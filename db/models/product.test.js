'use strict'

const {PRODUCT_REVIEW_LIMIT, PRODUCT_LIMIT} = require('./constants');

const db = require('APP/db')
    , {Product} = db
    , {expect} = require('chai')

/* global describe it before afterEach */

describe('Product', () => {
  before('Await database sync', () => db.didSync)
  afterEach('Clear the tables', () => db.truncate({ cascade: true }))

  let product1, product2, product3;
  beforeEach('Create Products', () => {
    return Promise.all([
        Product.create({title: "Ross' first painting", quantity: 1, tags: ['cool', 'ross'], description: "??????????", price: 99999999.99})
        .then(product => product1 = product),
        Product.create({title: "Happy Little Trees", quantity: 10385, tags: ['trees', 'ross'], description: "??????????", price: 999.99})
        .then(product => product2 = product),
        Product.create({title: "Afro", quantity: 1, tags: ['ross', 'phony'], description: "??????????", price: 1000000.00})
        .then(product => product3 = product)
      ])
      .then(() => product1.createReview({title: "5/7", text: "WE HATE YOU DEAN AND EDWARD", rating: 5}))
      .then(() => product1.createReview({title: "AMAZING", text: "WE HATE YOU DEAN AND EDWARD", rating: 5}))
      .then(() => product1.createReview({title: "PERFECTION", text: "WE HATE YOU DEAN AND EDWARD", rating: 5}))
      .then(() => product1.createReview({title: "10/10", text: "WE HATE YOU DEAN AND EDWARD", rating: 5}))
      .then(() => product3.createReview({title: "buyer beware!!!", text: "WE HATE YOU DEAN AND EDWARD", rating: 1}))
  })

  // describe.only('validations', () => {
  //   it('validates product tags', () => {
  //     Product.create({title:"joe", quantity: 2, description: "??"})).to.throw('Validation error');
  //   })
  // })

  describe('instance methods', () => {
    describe('reviews', () => {
      it('returns none if there are no reviews', () => {
        return product2.getReviewsWithOffset(0)
        .then(reviews => expect(reviews).to.be.length(0))
      })
      it('returns none if offset is too high', () => {
        return product1.getReviewsWithOffset(12)
        .then(reviews => expect(reviews).to.be.length(0))
      })
      it('returns one if offset is same as total number', () => {
        return product1.getReviewsWithOffset(3)
        .then(reviews => expect(reviews[0].title).to.equal("10/10"))
      })
    })
  })
  describe.only('class methods', () => {
    describe('getting products', () => {
      it('returns none if offset is too high', () => {
        return Product.findAllWithOffset(3)
        .then(products => expect(products).to.be.length(0))
      })
      it('returns all with 0 offset', () => {
        return Product.findAllWithOffset(0)
        .then(products => expect(products).to.be.length(3))
      })
      it('returns all with tag ross', () => {
        return Product.searchWithOffset(['ross'], 0)
        .then(products => expect(products).to.be.length(3))
      })
      it('returns all with tags ross and trees', () => {
        return Product.searchWithOffset(['ross', 'trees'], 0)
        .then(products => expect(products).to.be.length(1))
      })
      it('returns none if tag is not used', () => {
        return Product.searchWithOffset(['fake tag'], 0)
        .then(products => expect(products).to.be.length(0))
      })
    })
  })
})

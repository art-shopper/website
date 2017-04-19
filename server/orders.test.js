const request = require('supertest')
    , {expect} = require('chai')
    , db = require('APP/db')
    , app = require('./start')
    , User = db.User

/* global describe it before afterEach */

describe('/api/orders', () => {
  before('Await database sync', () => db.didSync)
  afterEach('Clear the tables', () => db.truncate({ cascade: true }))

  let user1, user2, user3, order1;

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
    .then(order => order1 = order)
  })

  describe('GET /:id', () =>
    describe('when user is not admin', () =>
      it('fails with a 403 (Unauthorized)', () =>
        request(app)
          .get(`/api/orders/${order1.id}`)
          .send({
            user: user2
          })
          .expect(403)
      )))

// Still working on this 
  describe.only('POST', () =>
    describe('when not logged in', () => {
      it('creates a order', () =>
        request(app)
          .post('/api/orders')
          .send({
            email: 'beth@secrets.org',
            password: '12345',
            orderItems: [{
              productId: 1,
              quantity: 2,
              current_price: 1000000
            }]
          })
          .expect(201))

      xit('redirects to the order it just made', () =>
        request(app)
          .post('/api/orders')
          .send({
            email: 'eve@interloper.com',
            password: '23456',
          })
          .redirects(1)
          .then(res => expect(res.body).to.contain({
            email: 'eve@interloper.com'
          })))
    }))
})

const request = require('supertest')
    , {expect} = require('chai')
    , db = require('APP/db')
    , app = require('./start')
    , User = db.User

/* global describe it before afterEach */

const omri = {username:"ihatebones@omri.com", password:"thanksobama"};

describe('/api/orders', () => {
  before('Await database sync', () => db.didSync)
  afterEach('Clear the tables', () => db.truncate({ cascade: true }))

  let user1, user2, user3, userOmri, order1;

  beforeEach('Create a user', () => {
    return Promise.all([
      User.create({id: 420, email:"peporoniandchease@gmail.com"})
      .then(user => user1 = user),
      User.create({id: 421, email:"peporoni@gmail.com"})
      .then(user => user2 = user),
      User.create({id: 422, email:"chease@gmail.com"})
      .then(user => user3 = user),
      User.create({email: omri.username, password: omri.password})
      .then(user => userOmri = user)
    ])
    .then(() => user1.createOrder())
    .then(order => order1 = order)
    .then(request(app).get(`/api/login`))
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

  describe('POST', () => {
    describe('when not logged in', () => {
      it('creates a order', () =>
        request(app)
          .post('/api/orders')
          .send({
            email: 'beth@secrets.org',
            orderItems: [{
              productId: 1,
              quantity: 2,
              current_price: 1000000
            }]
          })
          .expect(201))
    })

    describe('when logged in', () => {

      const agent = request.agent(app)

      beforeEach('log in', () => agent
        .post('/api/auth/login/local')
        .send(omri)
      )

      it('creates an order for that user', () => 
          agent
            .post('/api/orders')
            .send({
              orderItems: [{
                productId: 1,
                quantity: 2,
                current_price: 1000000
              }]       
            })
            .then(() => userOmri.getOrders())
            .then(orders => expect(orders).to.be.length(1))

          )
      })
    })

})

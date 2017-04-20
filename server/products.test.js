const request = require('supertest')
    , {expect} = require('chai')
    , db = require('APP/db')
    , {Product} = db
    , app = require('./start');

describe('/api/products', () => {
  before('Await database sync', () => db.didSync);
  afterEach('Clear the tables', () => db.truncate({ cascade: true }));

  // beforeEach to seed database with two products
  let product1, product2;
  beforeEach('Create Products', () => {
    return Promise.all([
      Product.create({title: "Ross' first painting", quantity: 1, tags: ['cool', 'bobross'], description: 'Very beautiful painting, good start', price: 99999999.99})
        .then(product => product1 = product),
      Product.create({title: 'Happy Little Trees', quantity: 10385, tags: ['trees', 'bobross'], description: 'Exquisite masterpiece.', price: 999.99})
        .then(product => product2 = product)
    ])
  });

  describe('GET /', () =>
    describe('when not logged in', () =>
      it('get all products', () =>
        request(app)
          .get(`/api/products/`)
          .expect(200)
      )));

  describe('POST /', () =>
    describe('when not logged in', () =>
      it('does not allow user to post', () =>
        request(app)
          .post(`/api/products/`)
          .expect(403)
      )));

});

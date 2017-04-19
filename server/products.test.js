const request = require('supertest')
    , {expect} = require('chai')
    , db = require('APP/db')
    , app = require('./start');

describe('/api/products', () => {
  before('Await database sync', () => db.didSync);
  afterEach('Clear the tables', () => db.truncate({ cascade: true }));

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

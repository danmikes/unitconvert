const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests: GET /api/convert => conversion object', function () {

  const galToL = 3.78541;
  const lbsToKg = 0.453592;
  const miToKm = 1.60934;

// 1. Convert a valid input such as 10L: GET request to /api/convert.
  test('1. convert 10L (valid input)', function (done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '10L' })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 10);
        assert.equal(res.body.initUnit, 'L');
        assert.approximately(res.body.returnNum, 10 / galToL, 0.1)
        assert.equal(res.body.returnUnit, 'gal');
        done();
    })
  })

// 2. Convert an invalid input such as 32g: GET request to /api/convert.
  test('2. convert 32g (invalid input)', function (done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '32g' })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initUnit, undefined);
        done();
    })
  })

// 3. Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert.
  test('3. convert 3/7.2/4kg (invalid input)', function (done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '3/7.2/4kg' })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, undefined);
        done();
    })
  })

// 4. Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert.
  test('4. convert 3/7.2/4kilomegagram (invalid input)', function (done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '3/7.2/4kilomegagram' })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, undefined);
        assert.equal(res.body.initUnit, undefined);
        done();
    })
  })

// 5. Convert with no number such as kg: GET request to /api/convert.
  test('5. convert kg (valid input)', function (done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: 'kg' })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, 'kg');
        assert.approximately(res.body.returnNum, 1 / lbsToKg, 0.1)
        assert.equal(res.body.returnUnit, 'lbs');
        done();
    })
  })
});

const chai = require('chai');
const expect = chai.expect;
const http = require('http');
const app = require('../index');
const server = require('http').createServer(app);

describe('GET /hello', () => {
  before(done => {
    server.listen(3000, done);
  });

  after(done => {
    server.close(done);
  });

  it('should return "Hello World!"', done => {
    http.get('http://localhost:3000/hello', res => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        expect(data).to.equal('Hello World!');
        done();
      });
    });
  });
});
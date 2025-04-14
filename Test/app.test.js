const chai = require('chai');
const expect = chai.expect;
const http = require('http');
const app = require('../index');
const server = require('http').createServer(app);

describe('GET /hello', () => {
  let port;

  before(done => {
    server.listen(0, () => { 
      const address = server.address();
      port = address.port; 
      done();
    });

    server.on('error', (err) => {
      done(err); 
    });
  });

  after(done => {
    if (server.listening) {
      server.close(done);
    } else {
      done(); 
    }
  });

  it('should return "Hello World!"', done => {
    http.get(`http://localhost:${port}/hello`, res => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        expect(data).to.equal('Hello World!');
        done();
      });
    }).on('error', done);
  });
});
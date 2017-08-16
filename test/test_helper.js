const chai = require('chai');
const should = chai.should();

const config = require('../src/js/config.js').default;
const VODService = require('../src/js/services/VODService').default;
const testVODService = new VODService(config.vodService.endpointUrl);

const nock = require('nock');

describe('Testing VODService with a mock backend', () => {
  it('should receive an array of entries if the response from the server was successful with status code 200', (done) => {
    nock('http://127.0.0.1:3000/api/videos/')
      .get('')
      .reply(200, {
        "entries": [
          {
            "title": "10 Things I Hate About You",
            "description": "...",
            "type": "movie",
            "publishedDate": 931478400000,
            "availableDate": 931478400000,
            "metadata": [
              {
                "value": "en",
                "name": "language"
              }
            ]
          }, {
            //...
          }
        ]
      });

    testVODService.getData()
      .then(entries => {
        entries.should.be.a('array');
        done();
      })
      .catch(error => {
        console.log(error);
      });
  });

  it('should receive an empty array of entries if the response from the server was successful but status code was not 200', (done) => {
    nock('http://127.0.0.1:3000/api/videos/')
      .get('')
      .reply(201);

    testVODService.getData()
      .then(entries => {
        entries.length.should.be.eql(0);
        done();
      })
      .catch(error => {
        console.log(error);
      });
  });

  it('should receive an empty array of entries if the response code from the server was 4xx', (done) => {
    nock('http://127.0.0.1:3000/api/videos/')
      .get('')
      .reply(404);

    testVODService.getData()
      .then(entries => {
        entries.length.should.be.eql(0);
        done();
      })
      .catch(error => {
        console.log(error);
      });
  });

  it('should receive an empty array of entries if the response code from the server was 5xx', (done) => {
    nock('http://127.0.0.1:3000/api/videos/')
      .get('')
      .reply(500);

    testVODService.getData()
      .then(entries => {
        entries.length.should.be.eql(0);
        done();
      })
      .catch(error => {
        console.log(error);
      });
  });
});

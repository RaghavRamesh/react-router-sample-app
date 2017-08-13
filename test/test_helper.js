const chai = require('chai');
const should = chai.should();

const config = require('../src/js/config.js').default;
const VODService = require('../src/js/services/VODService').default;
const testVODService = new VODService(config.vodService.endpointUrl);

describe('VODService', () => {
  it('should receive an array of entries', (done) => {
    testVODService.getData()
      .then(data => {
        data.should.be.a('array');
        done();
      });
  })
});

describe('VODService', () => {
  it('should contain 30 entries', (done) => {
    testVODService.getData()
      .then(data => {
        data.length.should.be.eql(30);
        done();
      });
  })
});

// Test catch

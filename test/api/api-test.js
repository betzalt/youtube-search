import expect from 'expect';
import nock from 'nock';
import rawSearchFixture from '../fixtures/rawSearch.json';
import formattedSearchFixture from '../fixtures/formattedSearch.json';
import { formatSearch, requestSearchResults } from '../../src/api';

describe('api', () => {
  describe('formatSearch', () => {
    it('should format a search response', () => {
      expect(formatSearch('test', rawSearchFixture)).toEqual(formattedSearchFixture);
    });
  });

  describe('requestSearchResults', () => {
    it('should request search results for a query', (done) => {
      const YT = nock('https://www.googleapis.com')
        .get('/youtube/v3/search?part=snippet&type=video&maxResults=25&key=AIzaSyAe_7Gr4-9RNPW9RTusvRTzQ3-M0pz0_i0&q=test')
        .reply(200, rawSearchFixture);

      requestSearchResults('test')
        .then(() => {
          YT.done();
          done();
        });
    });

    it('should return a formatted search response', (done) => {
      nock('https://www.googleapis.com')
        .get('/youtube/v3/search?part=snippet&type=video&maxResults=25&key=AIzaSyAe_7Gr4-9RNPW9RTusvRTzQ3-M0pz0_i0&q=test')
        .reply(200, rawSearchFixture);

      requestSearchResults('test')
        .then(response => {
          expect(response).toEqual(formattedSearchFixture);
          done();
        });
    });
  });
});

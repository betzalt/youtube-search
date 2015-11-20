import expect from 'expect';
import proxyquire from 'proxyquire';
import formattedSearchFixture from '../fixtures/formattedSearch.json';
import {
  REQUEST_RESULTS,
  REQUEST_RESULTS_SUCCESS,
  REQUEST_RESULTS_FAILURE,
} from '../../src/constants/actionTypes';

describe('actions', () => {
  describe('searchAction', () => {
    it('should dispatch REQUEST_RESULTS', (done) => {
      const fakeDispatch = expect.createSpy();
      const fakeRequestSearchResults = expect.createSpy().andReturn(
        Promise.resolve(formattedSearchFixture)
      );

      const { searchAction } = proxyquire('../../src/actions', {
        '../api': {
          requestSearchResults: fakeRequestSearchResults,
        },
      });

      searchAction('test')(fakeDispatch).then(() => {
        const action = fakeDispatch.calls[0].arguments[0];
        expect(action).toEqual({
          type: REQUEST_RESULTS,
          payload: {
            query: 'test',
          },
        });
        done();
      });
    });

    it('should dispatch REQUEST_RESULTS_SUCCESS', (done) => {
      const fakeDispatch = expect.createSpy();
      const fakeRequestSearchResults = expect.createSpy().andReturn(
        Promise.resolve(formattedSearchFixture)
      );

      const { searchAction } = proxyquire('../../src/actions', {
        '../api': {
          requestSearchResults: fakeRequestSearchResults,
        },
      });

      searchAction('test')(fakeDispatch).then(() => {
        const action = fakeDispatch.calls[1].arguments[0];
        expect(action).toEqual({
          type: REQUEST_RESULTS_SUCCESS,
          payload: formattedSearchFixture,
        });
        done();
      });
    });

    it('should dispatch REQUEST_RESULTS_FAILURE', (done) => {
      const fakeDispatch = expect.createSpy();
      const fakeRequestSearchResults = expect.createSpy().andReturn(
        Promise.reject('test failure')
      );

      const { searchAction } = proxyquire('../../src/actions', {
        '../api': {
          requestSearchResults: fakeRequestSearchResults,
        },
      });

      searchAction('test')(fakeDispatch).then(() => {
        const action = fakeDispatch.calls[1].arguments[0];
        expect(action).toEqual({
          type: REQUEST_RESULTS_FAILURE,
          payload: 'test failure',
        });
        done();
      });
    });
  });
});

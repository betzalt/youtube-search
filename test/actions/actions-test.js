import expect from 'expect';
import proxyquire from 'proxyquire';
import formattedSearchFixture from '../fixtures/formattedSearch.json';
import {
  REQUEST_RESULTS,
  REQUEST_RESULTS_SUCCESS,
  REQUEST_RESULTS_FAILURE,
  RESET_CURRENT_QUERY,
  REQUEST_MORE_RESULTS,
  REQUEST_MORE_RESULTS_SUCCESS,
  REQUEST_MORE_RESULTS_FAILURE,
} from '../../src/constants/actionTypes';
import { resetAction } from '../../src/actions';

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
          payload: {
            query: 'test',
            error: 'test failure',
          },
        });
        done();
      });
    });
  });

  describe('loadMoreAction', () => {
    it('should dispatch REQUEST_MORE_RESULTS', (done) => {
      const fakeDispatch = expect.createSpy();
      const fakeGetState = expect.createSpy().andReturn({
        searches: {
          test: {
            nextPageToken: 'pageToken',
          },
        },
      });

      const fakeRequestSearchResults = expect.createSpy().andReturn(
        Promise.resolve(formattedSearchFixture)
      );

      const { loadMoreAction } = proxyquire('../../src/actions', {
        '../api': {
          requestSearchResults: fakeRequestSearchResults,
        },
      });

      loadMoreAction('test')(fakeDispatch, fakeGetState).then(() => {
        const action = fakeDispatch.calls[0].arguments[0];
        expect(action).toEqual({
          type: REQUEST_MORE_RESULTS,
          payload: {
            query: 'test',
          },
        });
        done();
      });
    });

    it('should dispatch REQUEST_MORE_RESULTS_SUCCESS', (done) => {
      const fakeDispatch = expect.createSpy();
      const fakeGetState = expect.createSpy().andReturn({
        searches: {
          test: {
            nextPageToken: 'pageToken',
          },
        },
      });

      const fakeRequestSearchResults = expect.createSpy().andReturn(
        Promise.resolve(formattedSearchFixture)
      );

      const { loadMoreAction } = proxyquire('../../src/actions', {
        '../api': {
          requestSearchResults: fakeRequestSearchResults,
        },
      });

      loadMoreAction('test')(fakeDispatch, fakeGetState).then(() => {
        const action = fakeDispatch.calls[1].arguments[0];
        expect(action).toEqual({
          type: REQUEST_MORE_RESULTS_SUCCESS,
          payload: formattedSearchFixture,
        });
        done();
      });
    });

    it('should dispatch REQUEST_MORE_RESULTS_FAILURE', (done) => {
      const fakeDispatch = expect.createSpy();
      const fakeGetState = expect.createSpy().andReturn({
        searches: {
          test: {
            nextPageToken: 'pageToken',
          },
        },
      });

      const fakeRequestSearchResults = expect.createSpy().andReturn(
        Promise.reject('test failure')
      );

      const { loadMoreAction } = proxyquire('../../src/actions', {
        '../api': {
          requestSearchResults: fakeRequestSearchResults,
        },
      });

      loadMoreAction('test')(fakeDispatch, fakeGetState).then(() => {
        const action = fakeDispatch.calls[1].arguments[0];
        expect(action).toEqual({
          type: REQUEST_MORE_RESULTS_FAILURE,
          payload: {
            query: 'test',
            error: 'test failure',
          },
        });
        done();
      });
    });

    it('should do nothing if nextPageToken doesn\'t exist', () => {
      const fakeDispatch = expect.createSpy();
      const fakeGetState = expect.createSpy().andReturn({
        searches: {
          test: {},
        },
      });

      const { loadMoreAction } = require('../../src/actions');
      expect(loadMoreAction('test')(fakeDispatch, fakeGetState)).toNotExist();
    });
  });

  describe('resetAction', () => {
    it('should dispatch RESET_CURRENT_QUERY', () => {
      expect(resetAction()).toEqual({
        type: RESET_CURRENT_QUERY,
      });
    });
  });
});

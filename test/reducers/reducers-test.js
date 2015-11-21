import expect from 'expect';
import {
  REQUEST_RESULTS,
  REQUEST_RESULTS_SUCCESS,
  REQUEST_RESULTS_FAILURE,
  RESET_CURRENT_QUERY,
} from '../../src/constants/actionTypes';
import { currentQuery, searches } from '../../src/reducers';

describe('reducers', () => {
  describe('currentQuery', () => {
    it('should handle REQUEST_RESULTS', () => {
      const initialState = null;

      const action = {
        type: REQUEST_RESULTS,
        payload: {
          query: 'test',
        },
      };

      const expectedState = 'test';

      expect(currentQuery(initialState, action)).toEqual(expectedState);
    });

    it('should handle RESET_CURRENT_QUERY', () => {
      const initialState = 'test';

      const action = {
        type: RESET_CURRENT_QUERY,
      };

      const expectedState = null;

      expect(currentQuery(initialState, action)).toEqual(expectedState);
    });
  });

  describe('searches', () => {
    it('should handle REQUEST_RESULTS', () => {
      const initialState = {};

      const action = {
        type: REQUEST_RESULTS,
        payload: {
          query: 'test',
        },
      };

      const expectedState = {
        test: {
          query: 'test',
          results: [],
          loading: true,
          error: false,
        },
      };

      expect(searches(initialState, action)).toEqual(expectedState);
    });

    it('should handle REQUEST_RESULTS_SUCCESS`', () => {
      const initialState = {
        test: {
          query: 'test',
          results: [],
          loading: true,
          error: false,
        },
      };

      const action = {
        type: REQUEST_RESULTS_SUCCESS,
        payload: {
          query: 'test',
          results: [1, 2, 3],
        },
      };

      const expectedState = {
        test: {
          query: 'test',
          results: [1, 2, 3],
          loading: false,
          error: false,
        },
      };

      expect(searches(initialState, action)).toEqual(expectedState);
    });

    it('should handle REQUEST_RESULTS_FAILURE', () => {
      const initialState = {
        test: {
          query: 'test',
          results: [],
          loading: true,
          error: false,
        },
      };

      const action = {
        type: REQUEST_RESULTS_FAILURE,
        payload: {
          query: 'test',
          error: new Error('some error idk'),
        },
      };

      const expectedState = {
        test: {
          query: 'test',
          results: [],
          loading: false,
          error: true,
        },
      };

      expect(searches(initialState, action)).toEqual(expectedState);
    });
  });
});

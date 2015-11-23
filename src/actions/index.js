import {
  REQUEST_RESULTS,
  REQUEST_RESULTS_SUCCESS,
  REQUEST_RESULTS_FAILURE,
  RESET_CURRENT_QUERY,
  REQUEST_MORE_RESULTS,
  REQUEST_MORE_RESULTS_SUCCESS,
  REQUEST_MORE_RESULTS_FAILURE,
} from '../constants/actionTypes';
import { requestSearchResults, requestMoreResults } from '../api';

export const searchAction = (query) => (dispatch) => {
  dispatch({
    type: REQUEST_RESULTS,
    payload: {
      query,
    },
  });

  return requestSearchResults(query)
    .then(response => dispatch({
      type: REQUEST_RESULTS_SUCCESS,
      payload: {
        ...response,
      },
    }))
    .catch(error => dispatch({
      type: REQUEST_RESULTS_FAILURE,
      payload: {
        query,
        error,
      },
    }));
};

export const loadMoreAction = (query) => (dispatch, getState) => {
  const { nextPageToken } = getState().searches[query];

  if (nextPageToken) {
    dispatch({
      type: REQUEST_MORE_RESULTS,
      payload: {
        query,
      },
    });

    return requestMoreResults(query, nextPageToken)
      .then(response => dispatch({
        type: REQUEST_MORE_RESULTS_SUCCESS,
        payload: {
          ...response,
        },
      }))
      .catch(error => dispatch({
        type: REQUEST_MORE_RESULTS_FAILURE,
        payload: {
          query,
          error,
        },
      }));
  }
};

export const resetSearchResults = () => ({
  type: RESET_CURRENT_QUERY,
});

import {
  REQUEST_RESULTS,
  REQUEST_RESULTS_SUCCESS,
  REQUEST_RESULTS_FAILURE,
} from '../constants/actionTypes';
import { requestSearchResults } from '../api';

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
      payload: error,
    }));
};

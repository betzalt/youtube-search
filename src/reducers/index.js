import {
  REQUEST_RESULTS,
  REQUEST_RESULTS_SUCCESS,
  REQUEST_RESULTS_FAILURE,
  RESET_CURRENT_QUERY,
  REQUEST_MORE_RESULTS_SUCCESS,
  REQUEST_MORE_RESULTS_FAILURE,
} from '../../src/constants/actionTypes';

export const currentQuery = (state = null, action) => {
  switch (action.type) {

  case REQUEST_RESULTS:
    return action.payload.query;

  case RESET_CURRENT_QUERY:
    return null;

  default:
    return state;
  }
};

export const searches = (state = {}, action) => {
  switch (action.type) {

  case REQUEST_RESULTS:
    return {
      ...state,
      [action.payload.query]: {
        query: action.payload.query,
        results: [],
        loading: true,
        error: false,
      },
    };

  case REQUEST_RESULTS_SUCCESS:
    return {
      ...state,
      [action.payload.query]: {
        ...action.payload,
        loading: false,
        error: false,
      },
    };

  case REQUEST_MORE_RESULTS_SUCCESS:
    return {
      ...state,
      [action.payload.query]: {
        ...action.payload,
        results: [
          ...state[action.payload.query].results,
          ...action.payload.results,
        ],
        loading: false,
        error: false,
      },
    };

  case REQUEST_RESULTS_FAILURE:
  case REQUEST_MORE_RESULTS_FAILURE:
    return {
      ...state,
      [action.payload.query]: {
        ...state[action.payload.query],
        loading: false,
        error: true,
      },
    };

  default:
    return state;
  }
};

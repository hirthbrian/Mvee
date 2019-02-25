import {
  SEARCH,
  SEARCH_SUCCESS,
  SEARCH_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
  results: [],
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH:
      return {
        ...state,
        loading: true,
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        results: action.payload
      };
    case SEARCH_FAIL:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
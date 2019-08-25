import {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  SHOW_SEARCH_MODAL,
  HIDE_SEARCH_MODAL,
} from '../actions/types';

const INITIAL_STATE = {
  results: [],
  loading: false,
  isSearchModalVisible: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH_REQUEST:
      return {
        ...state,
        results: [],
        loading: true,
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        results: action.payload,
      };
    case SEARCH_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case SHOW_SEARCH_MODAL:
      return {
        ...state,
        isSearchModalVisible: true,
      };
    case HIDE_SEARCH_MODAL:
      return {
        ...state,
        isSearchModalVisible: false,
      };
    default:
      return state;
  }
};
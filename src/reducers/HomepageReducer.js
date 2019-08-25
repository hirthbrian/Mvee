import {
  FETCH_HOMPAGE_REQUEST,
  FETCH_HOMPAGE_SUCCESS,
  FETCH_HOMPAGE_FAILURE,
} from '../actions/types';

const INITIAL_STATE = {
  upcoming: [],
  popular: [],
  nowPlaying: [],
  isFetching: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_HOMPAGE_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_HOMPAGE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        popular: action.payload.popular,
        upcoming: action.payload.upcoming,
        nowPlaying: action.payload.nowPlaying,
      };
    case FETCH_HOMPAGE_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};
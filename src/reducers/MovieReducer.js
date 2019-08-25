import {
  FETCH_MOVIE_REQUEST,
  FETCH_MOVIE_SUCCESS,
  FETCH_MOVIE_FAILURE,
} from '../actions/types';

const INITIAL_STATE = {
  // [1337]: {
  //   id: 1337,
  //   title: 'The matix'
  //   isFetching: true,
  // }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_MOVIE_REQUEST:
      return {
        ...state,
        [action.payload.id]: {
          ...action.payload,
          isFetching: true,
        },
      };
    case FETCH_MOVIE_SUCCESS:
      return {
        ...state,
        [action.payload.id]: {
          ...action.payload,
          isFetching: false,
        },
      };
    case FETCH_MOVIE_FAILURE:
      return {
        ...state,
        [action.payload.id]: {
          ...action.payload,
          isFetching: false,
        },
      };
    default:
      return state;
  }
};
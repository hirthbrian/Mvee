import {
  FETCH_CAST_REQUEST,
  FETCH_CAST_SUCCESS,
  FETCH_CAST_FAILURE,
} from '../actions/types';

const INITIAL_STATE = {
  // [1337]: {
  //   id: 1337,
  //   name: 'John Cleese'
  //   isFetching: true,
  // }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CAST_REQUEST:
      return {
        ...state,
        [action.payload.id]: {
          ...action.payload,
          isFetching: true,
        },
      };
    case FETCH_CAST_SUCCESS:
      return {
        ...state,
        [action.payload.id]: {
          ...action.payload,
          isFetching: false,
        },
      };
    case FETCH_CAST_FAILURE:
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
import {
  FETCH_PERSON_REQUEST,
  FETCH_PERSON_SUCCESS,
  FETCH_PERSON_FAILURE,
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
    case FETCH_PERSON_REQUEST:
      return {
        ...state,
        [action.payload.id]: {
          ...action.payload,
          isFetching: true,
        },
      };
    case FETCH_PERSON_SUCCESS:
      return {
        ...state,
        [action.payload.id]: {
          ...action.payload,
          isFetching: false,
        },
      };
    case FETCH_PERSON_FAILURE:
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
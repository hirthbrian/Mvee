import {
  GET_PERSON,
  GET_PERSON_SUCCESS,
  GET_PERSON_FAIL,
  GET_PERSON_CREDITS,
  GET_PERSON_CREDITS_SUCCESS,
  GET_PERSON_CREDITS_FAIL,
  GET_PERSON_IMAGES,
  GET_PERSON_IMAGES_SUCCESS,
  GET_PERSON_IMAGES_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PERSON:
      return {
        ...state,
      };
    case GET_PERSON_SUCCESS:
      return {
        ...state,
        [action.payload.id]: {
          ...action.payload
        },
      };
    case GET_PERSON_FAIL:
      return {
        ...state,
      };

    case GET_PERSON_CREDITS:
      return {
        ...state,
      };
    case GET_PERSON_CREDITS_SUCCESS:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          ...action.payload
        },
      };
    case GET_PERSON_CREDITS_FAIL:
      return {
        ...state,
      };

    case GET_PERSON_IMAGES:
      return {
        ...state,
      };
    case GET_PERSON_IMAGES_SUCCESS:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          ...action.payload
        },
      };
    case GET_PERSON_IMAGES_FAIL:
      return {
        ...state,
      };

    default:
      return state;
  }
};
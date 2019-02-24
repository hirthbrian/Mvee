import {
  GET_MOVIE,
  GET_MOVIE_SUCCESS,
  GET_MOVIE_FAIL,
  GET_MOVIE_RATINGS,
  GET_MOVIE_RATINGS_SUCCESS,
  GET_MOVIE_RATINGS_FAIL,
  GET_MOVIE_CREDITS,
  GET_MOVIE_CREDITS_SUCCESS,
  GET_MOVIE_CREDITS_FAIL,
  GET_MOVIE_VIDEOS,
  GET_MOVIE_VIDEOS_SUCCESS,
  GET_MOVIE_VIDEOS_FAIL,
  GET_MOVIE_SIMILAR,
  GET_MOVIE_SIMILAR_SUCCESS,
  GET_MOVIE_SIMILAR_FAIL,
  GET_POPULAR_MOVIE,
  GET_POPULAR_MOVIE_SUCCESS,
  GET_POPULAR_MOVIE_FAIL,
  GET_UPCOMING_MOVIE,
  GET_UPCOMING_MOVIE_SUCCESS,
  GET_UPCOMING_MOVIE_FAIL,
  GET_NOW_PLAYING_MOVIE,
  GET_NOW_PLAYING_MOVIE_SUCCESS,
  GET_NOW_PLAYING_MOVIE_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
  upcoming: [],
  popular: [],
  nowPlaying: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_MOVIE:
      return {
        ...state,
      };
    case GET_MOVIE_SUCCESS:
      return {
        ...state,
        [action.payload.id]: {
          ...action.payload
        },
      };
    case GET_MOVIE_FAIL:
      return {
        ...state,
      };

    case GET_MOVIE_RATINGS:
      return {
        ...state,
      };
    case GET_MOVIE_RATINGS_SUCCESS:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          ...action.payload
        },
      };
    case GET_MOVIE_RATINGS_FAIL:
      return {
        ...state,
      };

    case GET_MOVIE_CREDITS:
      return {
        ...state,
      };
    case GET_MOVIE_CREDITS_SUCCESS:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          ...action.payload,
        },
      };
    case GET_MOVIE_CREDITS_FAIL:
      return {
        ...state,
      };

    case GET_MOVIE_VIDEOS:
      return {
        ...state,
      };
    case GET_MOVIE_VIDEOS_SUCCESS:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          ...action.payload,
        },
      };
    case GET_MOVIE_VIDEOS_FAIL:
      return {
        ...state,
      };

    case GET_MOVIE_SIMILAR:
      return {
        ...state,
      };
    case GET_MOVIE_SIMILAR_SUCCESS:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          ...action.payload,
        },
      };
    case GET_MOVIE_SIMILAR_FAIL:
      return {
        ...state,
      };

    case GET_POPULAR_MOVIE:
      return {
        ...state,
      };
    case GET_POPULAR_MOVIE_SUCCESS:
      return {
        ...state,
        popular: action.payload,
      };
    case GET_POPULAR_MOVIE_FAIL:
      return {
        ...state,
      };

    case GET_UPCOMING_MOVIE:
      return {
        ...state,
      };
    case GET_UPCOMING_MOVIE_SUCCESS:
      return {
        ...state,
        upcoming: action.payload,
      };
    case GET_UPCOMING_MOVIE_FAIL:
      return {
        ...state,
      };

    case GET_NOW_PLAYING_MOVIE:
      return {
        ...state,
      };
    case GET_NOW_PLAYING_MOVIE_SUCCESS:
      return {
        ...state,
        nowPlaying: action.payload,
      };
    case GET_NOW_PLAYING_MOVIE_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
};
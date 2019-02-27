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
  movieLoading: true,
  ratingsLoading: true,
  creditsLoading: true,
  videosLoading: true,
  similarLoading: true,
  upcomingLoading: true,
  popularLoading: true,
  nowPlayingLoading: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_MOVIE:
      return {
        ...state,
        movieLoading: true,
      };
    case GET_MOVIE_SUCCESS:
      return {
        ...state,
        movieLoading: false,
        [action.payload.id]: {
          ...action.payload
        },
      };
    case GET_MOVIE_FAIL:
      return {
        ...state,
        movieLoading: false,
      };

    case GET_MOVIE_RATINGS:
      return {
        ...state,
        ratingsLoading: true,
      };
    case GET_MOVIE_RATINGS_SUCCESS:
      return {
        ...state,
        ratingsLoading: false,
        [action.payload.id]: {
          ...state[action.payload.id],
          ...action.payload
        },
      };
    case GET_MOVIE_RATINGS_FAIL:
      return {
        ratingsLoading: false,
        ...state,
      };

    case GET_MOVIE_CREDITS:
      return {
        creditsLoading: true,
        ...state,
      };
    case GET_MOVIE_CREDITS_SUCCESS:
      return {
        ...state,
        creditsLoading: false,
        [action.payload.id]: {
          ...state[action.payload.id],
          ...action.payload,
        },
      };
    case GET_MOVIE_CREDITS_FAIL:
      return {
        creditsLoading: false,
        ...state,
      };

    case GET_MOVIE_VIDEOS:
      return {
        videosLoading: true,
        ...state,
      };
    case GET_MOVIE_VIDEOS_SUCCESS:
      return {
        ...state,
        videosLoading: false,
        [action.payload.id]: {
          ...state[action.payload.id],
          ...action.payload,
        },
      };
    case GET_MOVIE_VIDEOS_FAIL:
      return {
        videosLoading: false,
        ...state,
      };

    case GET_MOVIE_SIMILAR:
      return {
        similarLoading: true,
        ...state,
      };
    case GET_MOVIE_SIMILAR_SUCCESS:
      return {
        ...state,
        similarLoading: false,
        [action.payload.id]: {
          ...state[action.payload.id],
          ...action.payload,
        },
      };
    case GET_MOVIE_SIMILAR_FAIL:
      return {
        similarLoading: false,
        ...state,
      };

    case GET_POPULAR_MOVIE:
      return {
        popularLoading: true,
        ...state,
      };
    case GET_POPULAR_MOVIE_SUCCESS:
      return {
        ...state,
        popularLoading: false,
        popular: action.payload,
      };
    case GET_POPULAR_MOVIE_FAIL:
      return {
        popularLoading: false,
        ...state,
      };

    case GET_UPCOMING_MOVIE:
      return {
        upcomingLoading: true,
        ...state,
      };
    case GET_UPCOMING_MOVIE_SUCCESS:
      return {
        ...state,
        upcomingLoading: false,
        upcoming: action.payload,
      };
    case GET_UPCOMING_MOVIE_FAIL:
      return {
        upcomingLoading: false,
        ...state,
      };

    case GET_NOW_PLAYING_MOVIE:
      return {
        nowPlayingLoading: true,
        ...state,
      };
    case GET_NOW_PLAYING_MOVIE_SUCCESS:
      return {
        ...state,
        nowPlayingLoading: false,
        nowPlaying: action.payload,
      };
    case GET_NOW_PLAYING_MOVIE_FAIL:
      return {
        nowPlayingLoading: false,
        ...state,
      };
    default:
      return state;
  }
};
import moment from 'moment';

import {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  SHOW_SEARCH_MODAL,
  HIDE_SEARCH_MODAL,
} from './types';

import {
  axiosInstance,
  apiKey,
} from '../utils';

export const search = (query, page = 1) => (dispatch) => {
  dispatch({ type: SEARCH_REQUEST });
  axiosInstance.get('/search/movie', {
    params: {
      page,
      query,
      api_key: apiKey,
    },
  }).then(({ data }) => {
    const results = data.results
      .filter((item) => item.poster_path && item.vote_count)
      .map((item) => ({
        id: item.id,
        title: item.title,
        overview: item.overview,
        voteAverage: item.vote_average,
        year: item.release_date && moment(item.release_date).format('Y'),
        poster: `https://image.tmdb.org/t/p/w185/${item.poster_path}`,
      }));
    dispatch({ type: SEARCH_SUCCESS, payload: results });
  }).catch(() => {
    dispatch({ type: SEARCH_FAILURE });
  });
}

export const showSearchModal = () => (dispatch) => (
  dispatch({ type: SHOW_SEARCH_MODAL })
);

export const hideSearchModal = () => (dispatch) => (
  dispatch({ type: HIDE_SEARCH_MODAL })
);

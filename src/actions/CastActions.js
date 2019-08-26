import moment from 'moment';

import {
  FETCH_CAST_REQUEST,
  FETCH_CAST_SUCCESS,
  FETCH_CAST_FAILURE,
} from './types';

import {
  apiKey,
  axiosInstance,
} from '../config/Utils';

export const getCastCredits = (id) => (
  axiosInstance.get(`/person/${id}/movie_credits`, {
    params: {
      api_key: apiKey,
    },
  }).then(({ data }) => ({
    id: data.id,
    cast: data.cast
      .filter((item) => item.poster_path && item.vote_count)
      .sort((itemA, itemB) => itemA.popularity < itemB.popularity)
      .map((item) => ({
        id: item.id,
        title: item.title,
        year: item.release_date && moment(item.release_date).format('Y'),
        poster: `https://image.tmdb.org/t/p/w185/${item.poster_path}`,
      })),
    crew: data.crew
      .filter((item) => item.poster_path && item.vote_count)
      .sort((itemA, itemB) => itemA.popularity < itemB.popularity)
      .map((item) => ({
        id: item.id,
        title: item.title,
        year: item.release_date && moment(item.release_date).format('Y'),
        poster: `https://image.tmdb.org/t/p/w185/${item.poster_path}`,
      })),
  }))
);

export const getCastImages = (id) => (
  axiosInstance.get(`/person/${id}/tagged_images`, {
    params: {
      api_key: apiKey,
    },
  }).then(({ data }) => (
    data.results.map((item) => `https://image.tmdb.org/t/p/w780/${item.file_path}`)
  ))
);

export const getCast = (id) => (dispatch) => {
  dispatch({ type: FETCH_CAST_REQUEST, payload: { id } });
  axiosInstance.get(`/person/${id}`, {
    params: {
      api_key: apiKey,
    },
  }).then(({ data }) => {
    const credits = getCastCredits(data.id);
    const gallery = getCastImages(data.id);

    Promise.all([credits, gallery])
      .then((values) => {
        const cast = {
          id: data.id,
          name: data.name,
          birthday: data.birthday && moment(data.birthday).format('MMMM Do YYYY'),
          deathday: data.deathday && moment(data.deathday).format('MMMM Do YYYY'),
          biography: data.biography,
          picture: `https://image.tmdb.org/t/p/w500/${data.profile_path}`,
          credits: values[0],
          gallery: values[1],
        };
        dispatch({ type: FETCH_CAST_SUCCESS, payload: cast });
      })
      .catch(() => {
        dispatch({ type: FETCH_CAST_FAILURE, payload: { id } });
      });
  }).catch(() => {
    dispatch({ type: FETCH_CAST_FAILURE, payload: { id } });
  });
};

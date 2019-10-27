import moment from 'moment';

import {
  FETCH_HOMPAGE_REQUEST,
  FETCH_HOMPAGE_SUCCESS,
  FETCH_HOMPAGE_FAILURE,
} from './types';

import {
  apiKey,
  axiosInstance,
} from '../utils';

const mapToPoster = (item) => ({
  id: item.id,
  title: item.title,
  year: moment(item.release_date).format('Y'),
  poster: `https://image.tmdb.org/t/p/w185/${item.poster_path}`,
});

export const getPopularMovies = () => (
  axiosInstance.get('/movie/popular', {
    params: {
      api_key: apiKey,
    },
  })
    .then(({ data }) => data.results.map(mapToPoster))
);

export const getUpcomingMovies = () => (
  axiosInstance.get('/movie/upcoming', {
    params: {
      api_key: apiKey,
    },
  })
    .then(({ data }) => data.results.map(mapToPoster))
);

export const getNowPlayingMovies = () => (
  axiosInstance.get('/movie/now_playing', {
    params: {
      api_key: apiKey,
    },
  })
    .then(({ data }) => data.results.map(mapToPoster))
);

export const getHomepage = () => (dispatch) => {
  dispatch({ type: FETCH_HOMPAGE_REQUEST });

  const popular = getPopularMovies();
  const upcoming = getUpcomingMovies();
  const nowPlaying = getNowPlayingMovies();

  Promise.all([popular, upcoming, nowPlaying])
    .then((values) => {
      const homepage = {
        popular: values[0],
        upcoming: values[1],
        nowPlaying: values[2],
      };
      dispatch({ type: FETCH_HOMPAGE_SUCCESS, payload: homepage });
    })
    .catch((error) => {
      console.log('error', error.message)
      dispatch({ type: FETCH_HOMPAGE_FAILURE });
    });
};

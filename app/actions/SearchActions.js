import {
  SEARCH,
  SEARCH_SUCCESS,
  SEARCH_FAIL,
} from './types';

import moment from 'moment';

const baseUrl = 'https://api.themoviedb.org/3';
const apiKey = '98cfd76c9dda6fa371610d72f2486cff';

export const search = (query, page = 1) => {
  return (dispatch) => {
    dispatch({ type: SEARCH });
    fetch(`${baseUrl}/search/movie?api_key=${apiKey}&query=${escape(query)}&page=${page}`)
      .then(response => response.json())
      .then(response => {
        const results = response.results.map(item => ({
          id: item.id,
          title: item.title,
          year: item.release_date && moment(item.release_date).format('Y'),
          poster: `https://image.tmdb.org/t/p/w185/${item.poster_path}`,
        }))
        dispatch({ type: SEARCH_SUCCESS, payload: results });
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: SEARCH_FAIL });
      });
  }
}
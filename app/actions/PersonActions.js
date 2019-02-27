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
} from './types';

import {
  baseUrl,
  apiKey,
} from '../config/Utils';

import moment from 'moment';

export const getPerson = (id) => {
  return (dispatch) => {
    dispatch({ type: GET_PERSON });
    fetch(`${baseUrl}/person/${id}?api_key=${apiKey}`)
      .then(response => response.json())
      .then(response => {
        const movie = {
          id: response.id,
          name: response.name,
          birthday: response.birthday && moment(response.birthday).format('MMMM Do YYYY'),
          deathday: response.deathday && moment(response.deathday).format('MMMM Do YYYY'),
          biography: response.biography,
          picture: `https://image.tmdb.org/t/p/w500/${response.profile_path}`,
        }
        dispatch({ type: GET_PERSON_SUCCESS, payload: movie });
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: GET_PERSON_FAIL });
      });
  }
}

export const getPersonCredits = (id) => {
  return (dispatch) => {
    dispatch({ type: GET_PERSON_CREDITS });
    fetch(`${baseUrl}/person/${id}/movie_credits?api_key=${apiKey}`)
      .then(response => response.json())
      .then(response => {
        const person = {
          id: response.id,
          cast: response.cast
            .filter(item => item.poster_path && item.vote_count)
            .sort((itemA, itemB) => itemA.popularity < itemB.popularity)
            .map(item => ({
              id: item.id,
              title: item.title,
              year: item.release_date && moment(item.release_date).format('Y'),
              poster: `https://image.tmdb.org/t/p/w185/${item.poster_path}`,
            })),
          crew: response.crew
            .filter(item => item.poster_path && item.vote_count)
            .sort((itemA, itemB) => itemA.popularity < itemB.popularity)
            .map(item => ({
              id: item.id,
              title: item.title,
              year: item.release_date && moment(item.release_date).format('Y'),
              poster: `https://image.tmdb.org/t/p/w185/${item.poster_path}`,
            })),
        }
        dispatch({ type: GET_PERSON_CREDITS_SUCCESS, payload: person });
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: GET_PERSON_CREDITS_FAIL });
      });
  }
}

export const getPersonImages = (id) => {
  return (dispatch) => {
    dispatch({ type: GET_PERSON_IMAGES });
    fetch(`${baseUrl}/person/${id}/tagged_images?api_key=${apiKey}`)
      .then(response => response.json())
      .then(response => {
        const person = {
          id: response.id,
          gallery: response.results.map(item => {
            return `https://image.tmdb.org/t/p/w780/${item.file_path}`
          })
        }
        dispatch({ type: GET_PERSON_IMAGES_SUCCESS, payload: person });
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: GET_PERSON_IMAGES_FAIL });
      });
  }
}
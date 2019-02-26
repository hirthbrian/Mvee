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
} from './types';

import moment from 'moment';

import {
  baseUrl,
  apiKey,
  omdbUrl,
  omdbKey,
} from '../config/Utils';

export const getPopularMovies = () => {
  return (dispatch) => {
    dispatch({ type: GET_POPULAR_MOVIE });
    fetch(`${baseUrl}/movie/popular?api_key=${apiKey}`)
      .then(response => response.json())
      .then(response => {
        const popular = response.results.map(item => ({
          id: item.id,
          title: item.title,
          year: moment(item.release_date).format('Y'),
          poster: `https://image.tmdb.org/t/p/w185/${item.poster_path}`,
        }));
        dispatch({ type: GET_POPULAR_MOVIE_SUCCESS, payload: popular });
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: GET_POPULAR_MOVIE_FAIL });
      });
  }
}

export const getUpcomingMovies = () => {
  return (dispatch) => {
    dispatch({ type: GET_UPCOMING_MOVIE });
    fetch(`${baseUrl}/movie/upcoming?api_key=${apiKey}`)
      .then(response => response.json())
      .then(response => {
        const popular = response.results.map(item => ({
          id: item.id,
          title: item.title,
          year: moment(item.release_date).format('Y'),
          poster: `https://image.tmdb.org/t/p/w185/${item.poster_path}`,
        }));
        dispatch({ type: GET_UPCOMING_MOVIE_SUCCESS, payload: popular });
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: GET_UPCOMING_MOVIE_FAIL });
      });
  }
}

export const getNowPlayingMovies = () => {
  return (dispatch) => {
    dispatch({ type: GET_NOW_PLAYING_MOVIE });
    fetch(`${baseUrl}/movie/now_playing?api_key=${apiKey}`)
      .then(response => response.json())
      .then(response => {
        const popular = response.results.map(item => ({
          id: item.id,
          title: item.title,
          year: moment(item.release_date).format('Y'),
          poster: `https://image.tmdb.org/t/p/w185/${item.poster_path}`,
        }));
        dispatch({ type: GET_NOW_PLAYING_MOVIE_SUCCESS, payload: popular });
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: GET_NOW_PLAYING_MOVIE_FAIL });
      });
  }
}

export const getMovie = (id) => {
  return (dispatch) => {
    dispatch({ type: GET_MOVIE });
    fetch(`${baseUrl}/movie/${id}?api_key=${apiKey}`)
      .then(response => response.json())
      .then(response => {
        const movie = {
          id: response.id,
          imdbId: response.imdb_id,
          title: response.title,
          tagline: response.tagline,
          synopsis: response.overview,
          date: response.release_date,
          runtime: response.runtime,
          poster: `https://image.tmdb.org/t/p/w780/${response.poster_path}`,
          backdrop: `https://image.tmdb.org/t/p/w780/${response.backdrop_path}`
        }
        dispatch({ type: GET_MOVIE_SUCCESS, payload: movie });
        dispatch(getMovieRatings(movie.id, movie.imdbId));
        dispatch(getMovieCredits(movie.id));
        dispatch(getMovieVideos(movie.id));
        dispatch(getMovieSimilar(movie.id));
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: GET_MOVIE_FAIL });
      });
  }
}

export const getMovieRatings = (id, imdbId) => {
  return (dispatch) => {
    dispatch({ type: GET_MOVIE_RATINGS });
    fetch(`${omdbUrl}?apikey=${omdbKey}&i=${imdbId}`)
      .then(response => response.json())
      .then(response => {
        const movie = {
          id: id,
          ratings: response.Ratings,
        }
        dispatch({ type: GET_MOVIE_RATINGS_SUCCESS, payload: movie });
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: GET_MOVIE_RATINGS_FAIL });
      });
  }
}

export const getMovieCredits = (id) => {
  return (dispatch) => {
    dispatch({ type: GET_MOVIE_CREDITS });
    fetch(`${baseUrl}/movie/${id}/credits?api_key=${apiKey}`)
      .then(response => response.json())
      .then(response => {
        const movie = {
          id: response.id,
          cast: response.cast.map(item => ({
            id: item.id,
            name: item.name,
            character: item.character,
            picture: `https://image.tmdb.org/t/p/w185/${item.profile_path}`,
          })),
          crew: response.crew.map(item => ({
            id: item.id,
            name: item.name,
            job: item.job,
            picture: `https://image.tmdb.org/t/p/w185/${item.profile_path}`,
          })),
        }
        dispatch({ type: GET_MOVIE_CREDITS_SUCCESS, payload: movie });
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: GET_MOVIE_CREDITS_FAIL });
      });
  }
}

export const getMovieVideos = (id) => {
  return (dispatch) => {
    dispatch({ type: GET_MOVIE_VIDEOS });
    fetch(`${baseUrl}/movie/${id}/videos?api_key=${apiKey}`)
      .then(response => response.json())
      .then(response => {
        const movie = {
          id: response.id,
          videos: response.results.map(item => ({
            id: item.id,
            name: item.name,
            url: `https://www.youtube.com/watch?v=${item.key}`,
            thumbnail: `https://img.youtube.com/vi/${item.key}/hqdefault.jpg`,
          })),
        }
        dispatch({ type: GET_MOVIE_VIDEOS_SUCCESS, payload: movie });
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: GET_MOVIE_VIDEOS_FAIL });
      });
  }
}

export const getMovieSimilar = (id) => {
  return (dispatch) => {
    dispatch({ type: GET_MOVIE_SIMILAR });
    fetch(`${baseUrl}/movie/${id}/similar?api_key=${apiKey}`)
      .then(response => response.json())
      .then(response => {
        const movie = {
          id: id,
          similar: response.results.map(item => ({
            id: item.id,
            title: item.title,
            year: item.release_date && moment(item.release_date).format('Y'),
            poster: `https://image.tmdb.org/t/p/w185/${item.poster_path}`,
          })),
        }
        dispatch({ type: GET_MOVIE_SIMILAR_SUCCESS, payload: movie });
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: GET_MOVIE_SIMILAR_FAIL });
      });
  }
}
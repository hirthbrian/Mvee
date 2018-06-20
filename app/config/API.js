const baseUrl = 'https://api.themoviedb.org/3';
const apiKey = '';
const omdbUrl = 'https://www.omdbapi.com/';
const omdbKey = '';

export default class API {
  static getMovies(query, page, callback) {
    return fetch(`${baseUrl}/search/movie?api_key=${apiKey}&query=${escape(query)}&page=${page}`)
      .then(response => response.json())
      .then((responseJson) => {
        callback(responseJson.results);
      });
  }

  static getSimilarMovies(movieId, callback, page = 1) {
    return fetch(`${baseUrl}/movie/${movieId}/similar?api_key=${apiKey}&page=${page}`)
      .then(response => response.json())
      .then((responseJson) => {
        callback(responseJson.results);
      });
  }

  static getPopularMovies(callback, page = 1) {
    return fetch(`${baseUrl}/movie/popular?api_key=${apiKey}&page=${page}`)
      .then(response => response.json())
      .then((responseJson) => {
        callback(responseJson.results);
      });
  }

  static getUpcomingMovies(callback, page = 1) {
    return fetch(`${baseUrl}/movie/upcoming?api_key=${apiKey}&page=${page}`)
      .then(response => response.json())
      .then((responseJson) => {
        callback(responseJson.results);
      });
  }

  static getNowPlayingMovies(callback, page = 1) {
    return fetch(`${baseUrl}/movie/now_playing?api_key=${apiKey}&page=${page}`)
      .then(response => response.json())
      .then((responseJson) => {
        callback(responseJson.results);
      });
  }

  static getMovieCredits(movieId, callback) {
    return fetch(`${baseUrl}/movie/${movieId}/credits?api_key=${apiKey}`)
      .then(response => response.json())
      .then((responseJson) => {
        callback(responseJson);
      });
  }

  static getPeopleCredits(personId, callback) {
    return fetch(`${baseUrl}/person/${personId}/combined_credits?api_key=${apiKey}`)
      .then(response => response.json())
      .then((responseJson) => {
        callback(responseJson);
      });
  }

  static getMovie(movieId, callback) {
    return fetch(`${baseUrl}/movie/${movieId}?api_key=${apiKey}`)
      .then(response => response.json())
      .then((responseJson) => {
        callback(responseJson);
      });
  }

  static getMovieRatings(movieImdbId, callback) {
    return fetch(`${omdbUrl}?apikey=${omdbKey}&i=${movieImdbId}`)
      .then(response => response.json())
      .then((responseJson) => {
        callback(responseJson.Ratings);
      });
  }

  static getPerson(personId, callback) {
    return fetch(`${baseUrl}/person/${personId}?api_key=${apiKey}`)
      .then(response => response.json())
      .then((responseJson) => {
        callback(responseJson);
      });
  }
}

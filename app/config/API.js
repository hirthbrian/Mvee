const baseUrl = 'https://api.themoviedb.org/3';
const apiKey = '98cfd76c9dda6fa371610d72f2486cff';

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

  static getMovie(movieId, callback) {
    return fetch(`${baseUrl}/movie/${movieId}?api_key=${apiKey}`)
      .then(response => response.json())
      .then((responseJson) => {
        callback(responseJson);
      });
  }
}

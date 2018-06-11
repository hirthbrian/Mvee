const baseUrl = 'https://api.themoviedb.org/3';
const apiKey = '98cfd76c9dda6fa371610d72f2486cff';
const omdbApiKey = 'API_KEY';

export default class API {

    static getMovies(query, page, callback) {
        // console.warn(page, query);
        return fetch(`${baseUrl}/search/movie?api_key=${apiKey}&query=${escape(query)}&page=${page}`)
            .then((response) => response.json())
            .then((responseJson) => {
                callback(responseJson.results);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    static getSimilarMovies(movieId, page = 1, callback) {
        return fetch(`${baseUrl}/movie/${movieId}/similar?api_key=${apiKey}&page=${page}`)
            .then((response) => response.json())
            .then((responseJson) => {
                callback(responseJson.results);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    static getMovie(movieId, callback) {
        return fetch(`${baseUrl}/movie/${movieId}?api_key=${apiKey}`)
            .then((response) => response.json())
            .then((responseJson) => {
                callback(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
    }

};
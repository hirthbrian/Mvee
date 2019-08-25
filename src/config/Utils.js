import axios from 'axios';

export const MAX_HEADER_HEIGHT = 200;

export const baseUrl = 'https://api.themoviedb.org/3';
export const apiKey = '98cfd76c9dda6fa371610d72f2486cff';
export const omdbUrl = 'https://www.omdbapi.com/';
export const omdbKey = '87a63633';

export const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
});

export const getTitleAndYear = (title, year) => {
  return year ? `${title} (${year})` : title
}

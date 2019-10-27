import axios from 'axios';

export const MAX_HEADER_HEIGHT = 250;

export const baseUrl = 'https://api.themoviedb.org/3';
export const apiKey = '98cfd76c9dda6fa371610d72f2486cff';
export const omdbUrl = 'https://www.omdbapi.com/';
export const omdbKey = '87a63633';

export const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
});

export const getTitleAndYear = (title, year) => {
  return year ? `${title} (${year})` : title
};

export const convertMinsToHrsMins = mins => (
  `${Math.floor(mins / 60)}h ${mins % 60}min`
);

export enum Color {
  Black = '#000000',
  LightBlack = '#433D3E',
  Red = '#EE596C',
  Transparent = 'transparent',
  White = '#FFFFFF',
  Grey = '#F0F0F0',
}

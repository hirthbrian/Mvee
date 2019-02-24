import { combineReducers } from 'redux';
import MovieReducer from '../reducers/MovieReducer';

export default combineReducers({
  movies: MovieReducer,
});
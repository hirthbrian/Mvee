import { combineReducers } from 'redux';
import MovieReducer from '../reducers/MovieReducer';
import PersonReducer from '../reducers/PersonReducer';

export default combineReducers({
  movies: MovieReducer,
  persons: PersonReducer,
});
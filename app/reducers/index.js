import { combineReducers } from 'redux';
import MovieReducer from '../reducers/MovieReducer';
import PersonReducer from '../reducers/PersonReducer';
import SearchReducer from '../reducers/SearchReducer';

export default combineReducers({
  movies: MovieReducer,
  persons: PersonReducer,
  search: SearchReducer,
});
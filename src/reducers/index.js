import { combineReducers } from 'redux';
import HomepageReducer from './HomepageReducer';
import MovieReducer from './MovieReducer';
import PersonReducer from './PersonReducer';
import SearchReducer from './SearchReducer';

export default combineReducers({
  homepage: HomepageReducer,
  movies: MovieReducer,
  persons: PersonReducer,
  search: SearchReducer,
});

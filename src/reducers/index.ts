import { combineReducers } from 'redux';
import HomepageReducer from './HomepageReducer';
import MovieReducer from './MovieReducer';
import CastReducer from './CastReducer';
import SearchReducer from './SearchReducer';

export default combineReducers({
  homepage: HomepageReducer,
  movies: MovieReducer,
  casts: CastReducer,
  search: SearchReducer,
});

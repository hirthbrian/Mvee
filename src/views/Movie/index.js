import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  getMovie,
} from '../../actions';

import Movie from './Movie';

const mapStateToProps = ({ movies }, { navigation }) => {
  const item = movies[navigation.state.params.id];
  return {
    loading: item ? item.isFetching : true,
    movie: item,
  };
};

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    getMovie,
  }, dispatch)
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Movie);

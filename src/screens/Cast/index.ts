import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  getCast,
  getCastCredits,
  getCastImages,
} from '../../actions';

import Cast from './Cast';

const mapStateToProps = ({ casts }, { navigation }) => {
  const item = casts[navigation.state.params.id];
  return {
    loading: item ? item.isFetching : true,
    cast: item,
  };
};

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    getCast,
    getCastCredits,
    getCastImages,
  }, dispatch)
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cast);

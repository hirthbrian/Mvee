import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  getPerson,
  getPersonCredits,
  getPersonImages,
} from '../../actions';

import Person from './Person';

const mapStateToProps = ({ persons }, { navigation }) => {
  const item = persons[navigation.state.params.id];
  return {
    loading: item ? item.isFetching : true,
    person: item,
  };
};

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    getPerson,
    getPersonCredits,
    getPersonImages,
  }, dispatch)
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Person);

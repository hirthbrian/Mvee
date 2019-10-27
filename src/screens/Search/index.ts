import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  search,
  hideSearchModal,
} from '../../actions';

import Search from './Search';

const mapStateToProps = ({ search }) => ({
  searchResults: search.results,
  loading: search.loading,
  isVisible: search.isSearchModalVisible,
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    search,
    hideSearchModal,
  }, dispatch)
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);

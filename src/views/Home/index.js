import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  getHomepage,
  showSearchModal,
  hideSearchModal,
} from '../../actions';

import Home from './Home';

const mapStateToProps = ({ search, homepage }) => ({
  isSearchModalVisible: search.isSearchModalVisible,
  popular: homepage.popular,
  upcoming: homepage.upcoming,
  nowPlaying: homepage.nowPlaying,
  loading: homepage.isFetching,
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    getHomepage,
    showSearchModal,
    hideSearchModal,
  }, dispatch)
);


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

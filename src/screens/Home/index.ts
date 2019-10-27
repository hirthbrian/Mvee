import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  getHomepage,
  hideSearchModal,
  showSearchModal,
} from '../../actions';

import Home from './Home';

const mapStateToProps = ({ search, homepage }) => ({
  isSearchModalVisible: search.isSearchModalVisible,
  popular: homepage.popular,
  upcoming: homepage.upcoming,
  nowPlaying: homepage.nowPlaying,
  loading: homepage.isFetching,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getHomepage,
    hideSearchModal,
    showSearchModal,
  }, dispatch)
);


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

import React from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import MovieList from '../../components/MovieList';

import Loading from '../../components/Loading';
import Search from '../Search';

import styles from './styles';

class Home extends React.Component {
  componentWillMount() {
    const {
      navigation,
      showSearchModal,
      getHomepage,
    } = this.props;

    navigation.setParams({ onSearchPress: showSearchModal });

    getHomepage();
  }

  renderList = (title, data) => (
    <MovieList
      title={title}
      data={data}
    />
  )

  goToMovie = (id, title) => {
    const {
      navigation,
      hideSearchModal,
    } = this.props;
    navigation.navigate({ routeName: 'Movie', params: { id, title }, key: id });
    hideSearchModal();
  }

  render() {
    const {
      nowPlaying,
      popular,
      upcoming,
      loading,
      isSearchModalVisible,
    } = this.props;

    if (loading) return <Loading />;

    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <Search
          isVisible={isSearchModalVisible}
          goToMovie={this.goToMovie}
        />
        <ScrollView
          style={styles.container}
        >
          {this.renderList('Now Playing', nowPlaying)}
          {this.renderList('Popular', popular)}
          {this.renderList('Upcoming', upcoming)}
        </ScrollView>
      </View>
    );
  }
}

export default Home;

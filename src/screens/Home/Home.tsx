import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

import MovieList from '../../components/MovieList';
import Loading from '../../components/Loading';
import Search from '../Search';

import styles from './styles';

class Home extends React.Component {
  componentDidMount() {
    const {
      navigation,
      showSearchModal,
      getHomepage,
    } = this.props;

    navigation.setParams({ onSearchPress: showSearchModal });
    getHomepage();
  }

  goToMovie = (id: number, title: string) => {
    const {
      navigation,
      hideSearchModal,
    } = this.props;
    hideSearchModal();
    navigation.navigate({ routeName: 'Movie', params: { id, title } });
  };

  render() {
    const {
      nowPlaying,
      popular,
      upcoming,
    } = this.props;

    return (
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <Search
          goToMovie={this.goToMovie}
        />
        <ScrollView
          style={styles.container}
        >
          <MovieList title="Now Playing" data={nowPlaying} />
          <MovieList title="Popular" data={popular} />
          <MovieList title="Upcoming" data={upcoming} />
        </ScrollView>
      </SafeAreaView>
    );
  }
};

export default Home;

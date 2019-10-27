import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

import MovieList from '../../components/MovieList';
import Loading from '../../components/Loading';
import Search from '../Search';

import styles from './styles';

const Home = ({
  nowPlaying,
  popular,
  upcoming,
  loading,
  hideSearchModal,
  showSearchModal,
  isSearchModalVisible,
  getHomepage,
  navigation,
}) => {

  useEffect(() => {
    navigation.setParams({ onSearchPress: showSearchModal });
    getHomepage();
  }, []);

  if (loading) return <Loading />;

  const goToMovie = (id: number, title: string) => {
    hideSearchModal();
    navigation.navigate({ routeName: 'Movie', params: { id, title } });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Search
        goToMovie={goToMovie}
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
};

export default Home;

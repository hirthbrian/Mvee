import React from 'react';
import {
  StyleSheet,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import Colors from '../config/Colors';
import MovieList from '../components/MovieList';

import {
  getPopularMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
} from '../actions';
import Loading from '../components/Loading';

class Home extends React.Component {
  componentWillMount() {
    const {
      getPopularMovies,
      getUpcomingMovies,
      getNowPlayingMovies,
    } = this.props;

    getPopularMovies();
    getUpcomingMovies();
    getNowPlayingMovies();
  }

  renderList = (title, data) => (
    <MovieList
      title={title}
      data={data}
    />
  )

  render() {
    const {
      nowPlaying,
      popular,
      upcoming,
      loading,
    } = this.props;

    if (loading) return <Loading />

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingBottom: 25,
        }}
      >
        {this.renderList('Now Playing', nowPlaying)}
        {this.renderList('Popular', popular)}
        {this.renderList('Upcoming', upcoming)}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 25,
    backgroundColor: Colors.blue,
  },
});

const mapStateToProps = ({ movies }) => ({
  popular: movies.popular,
  upcoming: movies.upcoming,
  nowPlaying: movies.nowPlaying,
  loading: (movies.popularLoading ||
    movies.upcomingLoading ||
    movies.nowPlayingLoading)
});

export default connect(mapStateToProps, { getPopularMovies, getUpcomingMovies, getNowPlayingMovies })(Home)
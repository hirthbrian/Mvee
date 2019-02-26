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
    } = this.props;

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
});

export default connect(mapStateToProps, { getPopularMovies, getUpcomingMovies, getNowPlayingMovies })(Home)
import React from 'react';
import {
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native';
import Colors from '../config/Colors';
import API from '../config/API';
import MovieList from './MovieList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 25,
    backgroundColor: Colors.blue,
  },
});

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      popular: [],
      upcoming: [],
      nowPlaying: [],
    };
    this.searchBar = null;
    this.searchInput = null;
  }

  componentWillMount() {
    this.props.navigation.setParams({ onSearch: () => {} });

    API.getPopularMovies((result) => {
      if (result.length !== 0) {
        this.setState({ popular: result });
      }
    });

    API.getUpcomingMovies((result) => {
      if (result.length !== 0) {
        this.setState({ upcoming: result });
      }
    });

    API.getNowPlayingMovies((result) => {
      if (result.length !== 0) {
        this.setState({ nowPlaying: result });
      }
    });
  }

  goToDetails = movie => () => {
    this.props.navigation.navigate('Movie', { movie, title: movie.title });
  };

  renderList = (title, data) => (
    <MovieList
      title={title}
      data={data}
      loading={data.length === 0}
      onPress={this.goToDetails}
    />
  )

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingBottom: 25,
        }}
      >
        <StatusBar
          barStyle="light-content"
          backgroundColor={Colors.red}
        />
        {this.renderList('Popular', this.state.popular)}
        {this.renderList('Upcoming', this.state.upcoming)}
        {this.renderList('Now Playing', this.state.nowPlaying)}
      </ScrollView>
    );
  }
}

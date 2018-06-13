import React from 'react';
import {
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import moment from 'moment';
import Colors from '../config/Colors';
import API from '../config/API';
import Poster from './Poster';
import Label from './Label';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.brown,
  },
});

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      popular: [],
      upcoming: [],
      nowPlaying: [],
      page: 1,
      searchText: null,
    };
    this.searchBar = null;
    this.searchInput = null;
  }

  componentWillMount() {
    this.props.navigation.setParams({ onSearch: this.onSearch });
    // this.search('James Bond');

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

  onSearch = (text) => {
    if (text) {
      this.setState({
        data: [],
        page: 1,
      });
      this.search(text);
    }
  }

  onEndReached = () => {
    this.setState({ page: this.state.page + 1 });
    this.search(this.state.searchText);
  }

  search = (query) => {
    API.getMovies(query, (result) => {
      if (result.length !== 0) {
        const results = this.state.data.concat(result);
        this.setState({ data: results });
      }
    });
  }

  goToDetails = movie => () => {
    this.props.navigation.navigate('Movie', { movie, title: movie.title });
  };

  renderItem = (data) => {
    const movie = data.item;

    return (
      <Poster
        title={movie.title}
        year={moment(movie.release_date).format('Y')}
        posterUrl={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
        onPress={this.goToDetails(movie)}
      />
    );
  };

  renderGenericList(title, list) {
    return (
      <View>
        <Label
          fontWeight={300}
          style={{
            fontSize: 28,
            color: Colors.white,
            padding: 10,
          }}
        >
          {title}
        </Label>
        <FlatList
          horizontal
          data={list}
          renderItem={this.renderItem}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => `movie-popular-${index}`}
        />
      </View>
    );
  }

  render() {
    return (
      <View
        style={styles.container}
      >

        {this.renderGenericList('Popular', this.state.popular)}
        {this.renderGenericList('Upcoming', this.state.upcoming)}
        {this.renderGenericList('Now Playing', this.state.nowPlaying)}
        {/* <FlatList
          data={this.state.data}
          numColumns={3}
          renderItem={this.renderItem}
          onEndReachedThreshold={0.8}
          // onEndReached={this.onEndReached}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => `movie-item-${index}`}
        /> */}
      </View>
    );
  }
}

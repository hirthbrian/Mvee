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
      page: 1,
      searchText: null,
    };
    this.searchBar = null;
    this.searchInput = null;
  }

  componentWillMount() {
    this.props.navigation.setParams({ onSearch: this.onSearch });
    this.search('James Bond');
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
    API.getMovies(query, this.state.page, (result) => {
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

  render() {
    return (
      <View
        style={styles.container}
      >
        <FlatList
          data={this.state.data}
          numColumns={3}
          renderItem={this.renderItem}
          onEndReachedThreshold={0.8}
          // onEndReached={this.onEndReached}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => `movie-item-${index}`}
        />
      </View>
    );
  }
}

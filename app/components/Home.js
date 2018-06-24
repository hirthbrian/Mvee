import React from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  FlatList,
  ScrollView,
} from 'react-native';
import moment from 'moment';
import Colors from '../config/Colors';
import API from '../config/API';
import MovieList from './MovieList';
import Label from './Label';
import Touchable from './Touchable';

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
      searchResults: [],
      popular: [],
      upcoming: [],
      nowPlaying: [],
    };
    this.searchBar = null;
    this.searchInput = null;
  }

  componentWillMount() {
    this.props.navigation.setParams({ onSearch: this.onSearch });

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
    API.getMovies(text, (result) => {
      this.setState({ searchResults: result.slice(0, 10) });
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

  renderSearchResultItem = (data) => {
    const movie = data.item;

    return (
      <Touchable
        onPress={this.goToDetails(movie)}
      >
        <View
          style={{
            padding: 10,
            flexDirection: 'row',
          }}
        >
          <Label
            style={{
              color: Colors.white,
            }}
          >
            {movie.title} {movie.release_date && `(${moment(movie.release_date).format('Y')})`}
          </Label>
        </View>
      </Touchable>
    );
  }

  renderSearchResult = () => (
    <FlatList
      data={this.state.searchResults}
      renderItem={this.renderSearchResultItem}
      ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: Colors.white }} />}
      keyExtractor={(item, index) => `result-${index}`}
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
          translucent
          barStyle="light-content"
          backgroundColor={Colors.transparent}
        />

        {this.renderSearchResult()}
        {this.renderList('Now Playing', this.state.nowPlaying)}
        {this.renderList('Popular', this.state.popular)}
        {this.renderList('Upcoming', this.state.upcoming)}
      </ScrollView>
    );
  }
}

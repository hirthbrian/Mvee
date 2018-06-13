import React from 'react';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import moment from 'moment';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import StarRating from 'react-native-star-rating';
import API from '../config/API';
import Colors from '../config/Colors';
import Poster from './Poster';

const styles = StyleSheet.create({
  detailBlock: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  title: {
    color: Colors.white,
    fontSize: 22,
    paddingBottom: 10,
  },
  description: {
    color: Colors.white,
    fontSize: 12,
  },
});

export default class Movie extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: {},
      similarMovies: [],
    };
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;

    API.getMovie(params.movie.id, (result) => {
      this.setState({ movie: result });
      API.getSimilarMovies(result.id, 1, (similarResult) => {
        this.setState({ similarMovies: similarResult });
      });
    });
  }

  goToDetails = movie => () => {
    this.props.navigation.navigate({ routeName: 'Movie', params: { movie, title: movie.title }, key: movie.id });
  }

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
  }

  renderSimilarMovies = () => (
    <View
      style={{
        paddingVertical: 10,
      }}
    >
      <Text
        style={[styles.title, { paddingHorizontal: 15 }]}
      >
        Similar Movies
      </Text>

      <FlatList
        horizontal
        data={this.state.similarMovies}
        ListHeaderComponent={() =>
          <View style={{ width: 15 }} />
        }
        ListFooterComponent={() =>
          <View style={{ width: 15 }} />
        }
        renderItem={this.renderItem}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `movie-similar-item-${index}`}
      />
    </View>
  )

  renderHeader = () => {
    const { width } = Dimensions.get('window');
    const { movie } = this.state;

    return (
      <ImageBackground
        style={{
          width,
          height: 250,
          justifyContent: 'flex-end',
          backgroundColor: Colors.brown,
        }}
        source={{ uri: `https://image.tmdb.org/t/p/w780/${movie.backdrop_path}` }}
      />
    );
  };

  render() {
    const { movie } = this.state;

    return (
      <ParallaxScrollView
        contentBackgroundColor={Colors.brown}
        parallaxHeaderHeight={250}
        outputScaleValue={7}
        renderBackground={this.renderHeader}
      >
        <LinearGradient
          colors={[Colors.transparent, Colors.brown]}
          style={{
            marginTop: -75,
            paddingHorizontal: 15,
            paddingVertical: 5,
            justifyContent: 'flex-end',
          }}
        >
          <Text
            style={{
              fontSize: 38,
              color: Colors.white,
            }}
          >
            {movie.title}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 16,
              color: Colors.white,
            }}
          >
            {movie.tagline}
          </Text>
        </LinearGradient>
        <View
          style={styles.detailBlock}
        >
          <Text
            style={styles.title}
          >
            Details
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                color: Colors.white,
                fontSize: 12,
              }}
            >
              {moment(movie.release_date).format('MMMM Do YYYY')}
            </Text>
            <Text
              style={{
                color: Colors.white,
                fontSize: 12,
              }}
            >
              {`${movie.runtime} mins`}
            </Text>
          </View>
        </View>

        <View
          style={styles.detailBlock}
        >
          <Text
            style={styles.title}
          >
            Rating
          </Text>
          <StarRating
            disabled
            starSize={32}
            maxStars={10}
            emptyStarColor={Colors.white}
            fullStarColor={Colors.white}
            rating={movie.vote_average}
            containerStyle={{
              alignItems: 'center',
            }}
          />
        </View>

        <View
          style={styles.detailBlock}
        >
          <Text
            style={styles.title}
          >
            Synopsis
          </Text>
          <Text
            style={styles.description}
          >
            {movie.overview}
          </Text>
        </View>

        {this.renderSimilarMovies()}

      </ParallaxScrollView>
    );
  }
}

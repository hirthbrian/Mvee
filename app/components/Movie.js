import React from 'react';
import {
  Dimensions,
  StatusBar,
  Image,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';
import moment from 'moment';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import API from '../config/API';
import Colors from '../config/Colors';
import Label from './Label';
import MovieList from './MovieList';
import PersonList from './PersonList';

const styles = StyleSheet.create({
  detailBlock: {
    paddingHorizontal: 10,
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

const MAX_HEADER_HEIGHT = 300;
export const ratingImg = {
  'Internet Movie Database': require('../assets/img/imdb.png'),
  'Metacritic': require('../assets/img/metacritic.png'),
  'Rotten Tomatoes': require('../assets/img/rotten_tomatoes.png'),
};

export default class Movie extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: {},
      cast: [],
      crew: [],
      ratings: [],
      similarMovies: [],
    };
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;

    API.getMovie(params.movie.id, (result) => {
      this.setState({ movie: result });
      API.getMovieRatings(result.imdb_id, (resultRatings) => {
        this.setState({ ratings: resultRatings });
      });
      API.getMovieCredits(result.id, (credits) => {
        this.setState({
          cast: credits.cast,
          crew: credits.crew,
        });
      });
      API.getSimilarMovies(result.id, (similarResult) => {
        this.setState({ similarMovies: similarResult });
      });
    });
  }

  goToDetails = movie => () => {
    this.props.navigation.navigate({ routeName: 'Movie', params: { movie, title: movie.title }, key: movie.id });
  }

  goToPersonDetails = person => () => {
    this.props.navigation.navigate({ routeName: 'Person', params: { person, title: person.name }, key: person.id });
  }

  renderHeader = () => {
    const { width } = Dimensions.get('window');
    const { movie } = this.state;

    return (
      <ImageBackground
        style={{
          width,
          height: MAX_HEADER_HEIGHT,
          justifyContent: 'flex-end',
          backgroundColor: Colors.blue,
        }}
        source={{ uri: `https://image.tmdb.org/t/p/w780/${movie.backdrop_path}` }}
      />
    );
  };

  render() {
    const { movie } = this.state;

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.blue,
        }}
      >
        <ParallaxScrollView
          parallaxHeaderHeight={MAX_HEADER_HEIGHT}
          outputScaleValue={7}
          renderBackground={this.renderHeader}
          fadeOutForeground={false}
          contentBackgroundColor={Colors.blue}
          contentContainerStyle={{
            paddingBottom: 25,
          }}
          renderForeground={() => (
            <LinearGradient
              colors={[Colors.transparent, Colors.blue]}
              style={{
                flex: 1,
                paddingHorizontal: 10,
                paddingVertical: 5,
                justifyContent: 'flex-end',
              }}
            >
              <Label
                fontWeight={200}
                style={{
                  fontSize: 38,
                  color: Colors.white,
                }}
              >
                {movie.title}
              </Label>
              <Label
                fontWeight={200}
                numberOfLines={1}
                style={{
                  fontSize: 16,
                  color: Colors.white,
                }}
              >
                {movie.tagline}
              </Label>
            </LinearGradient>
          )}
        >
          <StatusBar
            barStyle="light-content"
            backgroundColor={Colors.blue}
          />
          <View
            style={styles.detailBlock}
          >
            <Label
              style={styles.title}
            >
              Details
            </Label>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Label
                style={{
                  color: Colors.white,
                  fontSize: 12,
                }}
              >
                {moment(movie.release_date).format('MMMM Do YYYY')}
              </Label>
              <Label
                style={{
                  color: Colors.white,
                  fontSize: 12,
                }}
              >
                {`${movie.runtime} mins`}
              </Label>
            </View>
          </View>

          <View
            style={styles.detailBlock}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Label
                style={styles.title}
              >
                Rating
              </Label>
              <Label
                style={{
                  color: Colors.white,
                }}
              >
                {/* {movie.vote_average} */}
              </Label>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}
            >
              {this.state.ratings.map(rating => (
                <View
                  key={rating.Source}
                  style={{
                    alignItems: 'center',
                  }}
                >
                  <Image
                    resizeMode="contain"
                    source={ratingImg[rating.Source]}
                    style={{
                      height: 50,
                      width: 50,
                    }}
                  />
                  <Label
                    style={{
                      paddingTop: 5,
                      color: Colors.white,
                    }}
                  >
                    {rating.Value}
                  </Label>
                </View>
              ))}
            </View>

          </View>

          <View
            style={styles.detailBlock}
          >
            <Label
              style={styles.title}
            >
              Synopsis
            </Label>
            <Label
              style={styles.description}
            >
              {movie.overview}
            </Label>
          </View>

          <PersonList
            title="Cast"
            data={this.state.cast}
            onPress={this.goToPersonDetails}
          />

          <PersonList
            title="Crew"
            data={this.state.crew}
            onPress={this.goToPersonDetails}
          />

          <MovieList
            title="Similar Movies"
            data={this.state.similarMovies}
            onPress={this.goToDetails}
          />

        </ParallaxScrollView>
      </View>
    );
  }
}

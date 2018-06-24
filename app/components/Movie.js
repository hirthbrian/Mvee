import React from 'react';
import {
  Dimensions,
  StatusBar,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  Modal,
} from 'react-native';
import moment from 'moment';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import ImageViewer from 'react-native-image-zoom-viewer';
import API from '../config/API';
import Colors from '../config/Colors';
import Label from './Label';
import MovieList from './MovieList';
import PersonList from './PersonList';
import VideoList from './VideoList';

const styles = StyleSheet.create({
  detailBlock: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  title: {
    color: Colors.white,
    fontSize: 28,
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

    const { width } = Dimensions.get('window');

    this.state = {
      movie: {},
      cast: [],
      ratings: [],
      similarMovies: [],
      videos: [],
      creditWidth: width / 4,
      creditHeight: (width / 4) * 1.55,
      showImageViewer: false,
    };
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;

    API.getMovie(params.movie.id, (result) => {
      this.setState({ movie: result });
      API.getMovieRatings(result.imdb_id, (resultRatings) => {
        this.setState({ ratings: resultRatings });
      });
      API.getMovieCredits(result.id, (credits) => {
        this.setState({
          cast: credits.cast,
        });
      });
      API.getSimilarMovies(result.id, (similarResult) => {
        this.setState({ similarMovies: similarResult });
      });
      API.getMovieVideos(result.id, (videosResult) => {
        this.setState({ videos: videosResult });
      });
    });
  }

  toggleImageViewer = () => {
    this.setState({ showImageViewer: !this.state.showImageViewer });
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
      <Image
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

  renderImageViewer = () => (
    <Modal
      transparent
      animationType="fade"
      onRequestClose={this.toggleImageViewer}
      visible={this.state.showImageViewer}
    >
      <ImageViewer
        renderIndicator={() => { }}
        onClick={this.toggleImageViewer}
        onSwipeDown={this.toggleImageViewer}
        imageUrls={[{ url: `https://image.tmdb.org/t/p/w780/${this.state.movie.poster_path}` }]}
      />
    </Modal>
  )

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
                flexDirection: 'row',
                alignItems: 'flex-end',
              }}
            >
              {movie.poster_path &&
                <TouchableWithoutFeedback
                  onPress={this.toggleImageViewer}
                >
                  <Image
                    style={{
                      borderRadius: 4,
                      width: this.state.creditWidth,
                      height: this.state.creditHeight,
                      backgroundColor: Colors.blue,
                    }}
                    source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }}
                  />
                </TouchableWithoutFeedback>
              }
              <View
                style={{
                  flex: 1,
                  paddingLeft: 10,
                }}
              >
                <Label
                  fontWeight={200}
                  numberOfLines={3}
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
              </View>
            </LinearGradient>
          )}
        >
          <StatusBar
            translucent
            barStyle="light-content"
            backgroundColor={Colors.transparent}
          />
          <View
            style={styles.detailBlock}
          >
            <Label
              fontWeight={200}
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

          {this.state.ratings.length > 0 ?
            <View
              style={styles.detailBlock}
            >
              <Label
                fontWeight={200}
                style={styles.title}
              >
                Rating
              </Label>

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
            : null
          }

          <View
            style={styles.detailBlock}
          >
            <Label
              fontWeight={200}
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

          <VideoList
            title="Videos"
            data={this.state.videos}
          />

          <PersonList
            title="Cast"
            data={this.state.cast}
            onPress={this.goToPersonDetails}
          />

          <MovieList
            title="Similar Movies"
            data={this.state.similarMovies}
            onPress={this.goToDetails}
          />

        </ParallaxScrollView>
        {this.renderImageViewer()}
      </View>
    );
  }
}

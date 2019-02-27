import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import { LinearGradient } from 'expo';
import { connect } from 'react-redux';
import moment from 'moment';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Lightbox from 'react-native-lightbox';
import Colors from '../config/Colors';
import Label from '../components/Label';
import Loading from '../components/Loading';
import MovieList from '../components/MovieList';
import PersonList from '../components/PersonList';
import VideoList from '../components/VideoList';
import Ratings from '../components/Ratings';
import { MAX_HEADER_HEIGHT } from '../config/Utils';

import {
  getMovie,
} from '../actions';

class Movie extends React.Component {
  componentWillMount() {
    const {
      navigation,
      getMovie,
    } = this.props;
    const id = navigation.getParam('id');

    getMovie(id);
  }

  renderHeader = () => {
    const { width } = Dimensions.get('window');
    const {
      backdrop,
    } = this.props.movie;

    return (
      <Image
        style={{
          width,
          height: MAX_HEADER_HEIGHT,
          justifyContent: 'flex-end',
          backgroundColor: Colors.blue,
        }}
        source={{ uri: backdrop }}
      />
    );
  };

  render() {
    const { width, height } = Dimensions.get('window');
    const {
      movie,
      loading,
    } = this.props;

    if (loading || !movie) return <Loading />;

    const {
      title,
      tagline,
      date,
      runtime,
      poster,
      ratings,
      videos,
      cast,
      crew,
      similar
    } = movie;

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
              <Lightbox
                renderContent={() => (
                  <Image
                    resizeMode={'contain'}
                    style={{
                      width: width,
                      height: height,
                      backgroundColor: Colors.black,
                    }}
                    source={{ uri: poster }}
                  />
                )}
              >
                <Image
                  style={{
                    borderRadius: 4,
                    width: width / 4,
                    height: (width / 4) * 1.55,
                    backgroundColor: Colors.blue,
                  }}
                  source={{ uri: poster }}
                />
              </Lightbox>
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
                  {title}
                </Label>
                <Label
                  fontWeight={200}
                  numberOfLines={1}
                  style={{
                    fontSize: 16,
                    color: Colors.white,
                  }}
                >
                  {tagline}
                </Label>
              </View>
            </LinearGradient>
          )}
        >
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
                {moment(date).format('MMMM Do YYYY')}
              </Label>
              <Label
                style={{
                  color: Colors.white,
                  fontSize: 12,
                }}
              >
                {`${runtime} mins`}
              </Label>
            </View>
          </View>

          <Ratings
            ratings={ratings}
          />

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
              {movie.synopsis}
            </Label>
          </View>

          <VideoList
            data={videos}
          />

          <PersonList
            title="Cast"
            data={cast}
          />

          <PersonList
            title="Crew"
            data={crew}
          />

          <MovieList
            title="Similar Movies"
            data={similar}
          />

        </ParallaxScrollView>
      </View>
    );
  }
}

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

const mapStateToProps = ({ movies }, props) => ({
  movie: movies[props.navigation.state.params.id],
  loading: (movies.movieLoading ||
    movies.ratingsLoading ||
    movies.creditsLoading ||
    movies.videosLoading ||
    movies.similarLoading)
});

export default connect(mapStateToProps, { getMovie })(Movie)
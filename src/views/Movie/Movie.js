import React from 'react';
import {
  Dimensions,
  Image,
  View,
} from 'react-native';
import moment from 'moment';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Colors from '../../config/Colors';
import Label from '../../components/Label';
import Loading from '../../components/Loading';
import MovieList from '../../components/MovieList';
import PersonList from '../../components/PersonList';
import VideoList from '../../components/VideoList';
import Ratings from '../../components/Ratings';
import { MAX_HEADER_HEIGHT } from '../../config/Utils';

import styles from './styles';

class Movie extends React.Component {
  constructor(props) {
    super(props);
    const {
      navigation,
      getMovie,
    } = props;
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
          backgroundColor: Colors.white,
        }}
        source={{ uri: backdrop }}
      />
    );
  };

  renderTitleBlock = () => {
    const {
      movie: {
        title,
        poster,
        tagline,
        date,
        runtime,
      },
    } = this.props;

    const { width } = Dimensions.get('window');

    const posterWidth = width / 4;
    const posterHeight = posterWidth * 1.55;

    return (
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 15,
        }}
      >
        <View
          style={{
            paddingBottom: 5,
            flexDirection: 'row',
          }}
        >
          <Image
            source={{ uri: poster }}
            style={{
              borderColor: Colors.white,
              borderWidth: 2,
              borderRadius: 2,
              marginTop: -posterHeight + 50,
              width: posterWidth,
              height: posterHeight,
            }}
          />
          <Label
            fontWeight={200}
            style={{
              flex: 1,
              paddingLeft: 10,
              color: Colors.lightBlack,
              fontSize: 18,
            }}
            numberOfLines={2}
          >
            {tagline}
          </Label>
        </View>

        <Label
          style={{
            color: Colors.black,
            fontSize: 32,
          }}
        >
          {title}
        </Label>

        <Label
          style={{
            color: Colors.lightBlack,
          }}
        >
          {`Release Date: ${moment(date).format('MMMM Do YYYY')}`}
        </Label>
        <Label
          style={{
            color: Colors.lightBlack,
          }}
        >
          {`Runtime: ${runtime} min`}
        </Label>
      </View>
    );
  }

  render() {
    const { loading } = this.props;

    if (loading) return <Loading />;

    const {
      ratings,
      videos,
      cast,
      similar,
      synopsis,
    } = this.props.movie;

    return (
      <ParallaxScrollView
        parallaxHeaderHeight={MAX_HEADER_HEIGHT}
        outputScaleValue={7}
        renderBackground={this.renderHeader}
        fadeOutForeground={false}
        contentBackgroundColor={Colors.white}
        contentContainerStyle={{
          flex: 1,
          paddingBottom: 25,
          backgroundColor: Colors.white,
        }}
      >
        {this.renderTitleBlock()}

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
            {synopsis}
          </Label>
        </View>

        <VideoList
          data={videos}
        />

        <PersonList
          title="Cast"
          data={cast}
        />

        <MovieList
          title="Similar Movies"
          data={similar}
        />

      </ParallaxScrollView>
    );
  }
}

export default Movie;

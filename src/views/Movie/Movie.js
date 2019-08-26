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
import {
  MAX_HEADER_HEIGHT,
  convertMinsToHrsMins,
} from '../../config/Utils';

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

  renderTitle = () => {
    const {
      movie: {
        title,
        poster,
        tagline,
      },
    } = this.props;

    const { width } = Dimensions.get('window');

    const posterWidth = width / 3;
    const posterHeight = posterWidth * 1.55;

    return (
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 15,
        }}
      >
        <Image
          source={{ uri: poster }}
          style={{
            alignSelf: 'center',
            borderColor: Colors.white,
            borderWidth: 2,
            borderRadius: 2,
            marginTop: -150,
            width: posterWidth,
            height: posterHeight,
            backgroundColor: Colors.white,
          }}
        />

        <Label
          fontWeight={200}
          style={{
            textAlign: 'center',
            color: Colors.black,
            fontSize: 32,
          }}
        >
          {title}
        </Label>

        {tagline.length > 0 && (
          <Label
            fontWeight={200}
            style={{
              textAlign: 'center',
              color: Colors.lightBlack,
              fontSize: 16,
            }}
            numberOfLines={2}
          >
            {tagline}
          </Label>
        )}
      </View>
    );
  }

  renderDetailText = (title, subtitle) => (
    <View
      style={{
        flex: 1,
        paddingVertical: 3,
        flexDirection: 'row',
      }}
    >
      <Label>
        {`${title}: `}
      </Label>
      <Label
        fontWeight={200}
        style={{
          flex: 1,
          color: Colors.lightBlack,
        }}
      >
        {subtitle}
      </Label>
    </View>

  )

  renderDetails = () => {
    const {
      movie: {
        date,
        runtime,
        directors,
        writers,
      },
    } = this.props;

    return (
      <View
        style={{
          padding: 10,
        }}
      >
        {this.renderDetailText('Director', directors.map((item) => item.name).join(', '))}
        {this.renderDetailText('Writers', writers.map((item) => item.name).join(', '))}
        {this.renderDetailText('Release Date', moment(date).format('MMMM Do YYYY'))}
        {this.renderDetailText('Runtime', convertMinsToHrsMins(runtime))}
      </View>
    );
  }

  render() {
    const { loading } = this.props;

    if (loading) return <Loading />;

    const {
      movie: {
        ratings,
        videos,
        actors,
        similar,
        synopsis,
      },
    } = this.props;

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
        {this.renderTitle()}
        {this.renderDetails()}

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
            Summary
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
          data={actors}
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

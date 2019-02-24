import React from 'react';
import {
  Dimensions,
  Image,
  StatusBar,
  View,
} from 'react-native';
import { LinearGradient } from 'expo';
import moment from 'moment';
import Carousel from 'react-native-snap-carousel';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import API from '../config/API';
import Colors from '../config/Colors';
import Label from './Label';
import MovieList from './MovieList';

const MAX_HEADER_HEIGHT = 300;

export default class Person extends React.Component {
  constructor(props) {
    super(props);

    const { width } = Dimensions.get('window');

    this.state = {
      person: {},
      credits: [],
      images: [],
      creditWidth: width / 4,
      creditHeight: (width / 4) * 1.55,
    };
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;

    API.getPerson(params.person.id, (result) => {
      this.setState({ person: result }, () => {
        API.getPeopleCredits(result.id, (credits) => {
          this.setState({ credits: credits.cast });
        });
        API.getPersonTaggedImages(result.id, (images) => {
          this.setState({ images: images.results.slice(0, 10) });
        });
      });
    });
  }

  goToDetails = movie => () => {
    this.props.navigation.navigate({ routeName: 'Movie', params: { movie, title: movie.title }, key: movie.id });
  }

  renderHeader = () => {
    const { width } = Dimensions.get('window');

    return (
      <Carousel
        loop
        autoplay
        autoplayInterval={5000}
        inactiveSlideScale={1}
        data={this.state.images}
        renderItem={(data) => {
          return (
            <Image
              style={{
                width,
                height: MAX_HEADER_HEIGHT,
              }}
              source={{ uri: `https://image.tmdb.org/t/p/w780/${data.item.file_path}` }}
            />
          );
        }}
        sliderWidth={width}
        itemWidth={width}
      />
    );
  };

  render() {
    const { person } = this.state;

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
              <Image
                style={{
                  borderRadius: 4,
                  width: this.state.creditWidth,
                  height: this.state.creditHeight,
                  backgroundColor: Colors.blue,
                }}
                source={{ uri: `https://image.tmdb.org/t/p/w500/${person.profile_path}` }}
              />
              <Label
                fontWeight={200}
                style={{
                  flex: 1,
                  fontSize: 32,
                  color: Colors.white,
                  paddingHorizontal: 10,
                }}
              >
                {this.state.person.name}
              </Label>
            </LinearGradient>
          )}
        >
          <StatusBar
            translucent
            barStyle="light-content"
            backgroundColor={Colors.transparent}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
            }}
          >
            <Label
              style={{
                color: Colors.white,
              }}
            >
              {person.birthday && moment(person.birthday).format('MMMM Do YYYY')}
            </Label>
            <Label
              style={{
                color: Colors.white,
              }}
            >
              {person.deathday && moment(person.deathday).format('MMMM Do YYYY')}
            </Label>
          </View>

          <Label
            fontWeight={200}
            style={{
              fontSize: 22,
              padding: 10,
              color: Colors.white,
            }}
          >
            Biography
          </Label>

          <Label
            style={{
              padding: 10,
              color: Colors.white,
            }}
          >
            {person.biography}
          </Label>

          <MovieList
            title="Credits"
            data={this.state.credits}
            onPress={this.goToDetails}
          />

        </ParallaxScrollView>
      </View>
    );
  }
}

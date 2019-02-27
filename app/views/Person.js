import React from 'react';
import {
  Dimensions,
  Image,
  View,
} from 'react-native';
import { LinearGradient } from 'expo';
import { connect } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Colors from '../config/Colors';
import Loading from '../components/Loading';
import Label from '../components/Label';
import MovieList from '../components/MovieList';
import { MAX_HEADER_HEIGHT } from '../config/Utils';

import {
  getPerson,
  getPersonCredits,
  getPersonImages,
} from '../actions';

class Person extends React.Component {
  constructor(props) {
    super(props);

    const { width } = Dimensions.get('window');

    this.state = {
      creditWidth: width / 4,
      creditHeight: (width / 4) * 1.55,
    };
  }

  componentWillMount() {
    const {
      navigation,
      getPerson,
      getPersonCredits,
      getPersonImages,
    } = this.props;
    const id = navigation.getParam('id');

    getPerson(id);
    getPersonCredits(id);
    getPersonImages(id);
  }

  goToDetails = movie => () => {
    this.props.navigation.navigate({ routeName: 'Movie', params: { movie, title: movie.title }, key: movie.id });
  }

  renderHeader = () => {
    const { width } = Dimensions.get('window');
    const {
      person: {
        gallery
      }
    } = this.props;

    return (
      <Carousel
        loop
        autoplay
        autoplayInterval={5000}
        inactiveSlideScale={1}
        data={gallery || []}
        renderItem={({ item }) => (
          <Image
            style={{
              width,
              height: MAX_HEADER_HEIGHT,
            }}
            source={{ uri: item }}
          />
        )}
        sliderWidth={width}
        itemWidth={width}
      />
    );
  };

  render() {
    const { person } = this.props;

    if (!person) return <Loading />;

    const {
      name,
      birthday,
      deathday,
      biography,
      picture,
      cast,
      crew,
    } = person;

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
                source={{ uri: picture }}
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
                {name}
              </Label>
            </LinearGradient>
          )}
        >
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
              {birthday}
            </Label>
            <Label
              style={{
                color: Colors.white,
              }}
            >
              {deathday}
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
            {biography}
          </Label>

          <MovieList
            title="Cast"
            data={cast}
            onPress={this.goToDetails}
          />

          <MovieList
            title="Crew"
            data={crew}
            onPress={this.goToDetails}
          />

        </ParallaxScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ persons }, props) => ({
  person: persons[props.navigation.state.params.id],
});

export default connect(mapStateToProps, { getPerson, getPersonCredits, getPersonImages })(Person)
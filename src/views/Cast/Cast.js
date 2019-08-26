import React from 'react';
import {
  Dimensions,
  Image,
  View,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Colors from '../../config/Colors';
import Loading from '../../components/Loading';
import Label from '../../components/Label';
import MovieList from '../../components/MovieList';
import { MAX_HEADER_HEIGHT } from '../../config/Utils';

class Cast extends React.Component {
  constructor(props) {
    super(props);
    const {
      navigation,
      getCast,
    } = props;

    const { width } = Dimensions.get('window');

    this.state = {
      creditWidth: width / 4,
      creditHeight: (width / 4) * 1.55,
    };

    const id = navigation.getParam('id');

    getCast(id);
  }

  goToDetails = (movie) => () => {
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
    const { loading } = this.props;

    if (loading) return <Loading />;

    const {
      person: {
        birthday,
        deathday,
        biography,
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
          paddingBottom: 25,
        }}
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
              color: Colors.black,
            }}
          >
            {birthday}
          </Label>
          <Label
            style={{
              color: Colors.black,
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
            color: Colors.black,
          }}
        >
          Biography
        </Label>

        <Label
          style={{
            padding: 10,
            color: Colors.black,
          }}
        >
          {biography}
        </Label>

      </ParallaxScrollView>
    );
  }
}

export default Cast;

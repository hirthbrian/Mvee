import React from 'react';
import {
  Image,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { View } from 'react-native-animatable';
import Colors from '../config/Colors';
import Touchable from './Touchable';
import Label from './Label';

class MovieCard extends React.Component {
  goToMovie = () => {
    const {
      id,
      title,
      navigation,
    } = this.props;
    navigation.navigate({ routeName: 'Movie', params: { id, title }, key: id });
  }

  render() {
    const { width } = Dimensions.get('window');
    const {
      poster,
      title,
      year,
      rounded,
    } = this.props;

    const posterWidth = width / 4;
    const posterHeight = posterWidth * 1.55;

    return (
      <View
        style={{
          width: posterWidth,
        }}
      >
        <Touchable
          onPress={this.goToMovie}
          containerStyle={{
            overflow: 'hidden',
            borderRadius: 2,
          }}
        >
          <Image
            style={{
              width: posterWidth,
              height: posterHeight,
              justifyContent: 'flex-end',
            }}
            source={{ uri: poster }}
          />
        </Touchable>
        <Label
          style={{
            padding: 5,
            fontSize: 10,
            textAlign: 'center',
            color: Colors.lightBlack,
          }}
          numberOfLines={1}
        >
          {title}
        </Label>
      </View>
    );
  }
}

MovieCard.propTypes = {
  poster: PropTypes.string,
  title: PropTypes.string,
  year: PropTypes.string,
  rounded: PropTypes.bool,
};

MovieCard.defaultProps = {
  rounded: false,
};

export default withNavigation(MovieCard);

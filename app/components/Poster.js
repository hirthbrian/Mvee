import React from 'react';
import {
  Dimensions,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo';
import PropTypes from 'prop-types';
import Colors from '../config/Colors';
import Touchable from './Touchable';
import Label from './Label';

export default class Poster extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const {
      onPress,
      posterUrl,
      title,
      year,
    } = this.props;
    const { width } = Dimensions.get('window');

    const posterWidth = width / 3;
    const posterHeight = posterWidth * 1.55;

    return (
      <Touchable
        onPress={onPress}
        containerStyle={{
          overflow: 'hidden',
          borderRadius: 4,
        }}
      >
        <ImageBackground
          style={{
            width: posterWidth,
            height: posterHeight,
            backgroundColor: Colors.blue,
          }}
          source={{ uri: `https://image.tmdb.org/t/p/w185/${posterUrl}` }}
        >
          <LinearGradient
            colors={[Colors.transparent, Colors.transparent, Colors.black]}
            style={{
              flex: 1,
              justifyContent: 'flex-end',
            }}
          >
            <Label
              style={{
                padding: 5,
                fontSize: 12,
                color: Colors.white,
              }}
            >
              {`${title} (${year})`}
            </Label>
          </LinearGradient>
        </ImageBackground>
      </Touchable>
    );
  }
}

Poster.propTypes = {
  onPress: PropTypes.func.isRequired,
  posterUrl: PropTypes.string.isRequired,
  title: PropTypes.string,
  year: PropTypes.string.isRequired,
};

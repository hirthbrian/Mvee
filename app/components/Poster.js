import React from 'react';
import {
  Text,
  Dimensions,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import Colors from '../config/Colors';
import Touchable from './Touchable';

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

    const posterWidth = (width - (4 * 3)) / 3;
    const posterHeight = posterWidth * 1.55;

    return (
      <Touchable
        onPress={onPress}
        containerStyle={{
          margin: 2,
          overflow: 'hidden',
          borderRadius: 2,
        }}
      >

        <ImageBackground
          style={{
            width: posterWidth,
            height: posterHeight,
            backgroundColor: Colors.blue,
          }}
          source={{ uri: posterUrl }}
        >
          <LinearGradient
            colors={[Colors.transparent, Colors.transparent, Colors.black]}
            style={{
              flex: 1,
              justifyContent: 'flex-end',
            }}
          >
            <Text
              style={{
                padding: 5,
                fontSize: 12,
                color: Colors.white,
              }}
            >
              {`${title} (${year})`}
            </Text>
          </LinearGradient>
        </ImageBackground>
      </Touchable>
    );
  }
}

Poster.propTypes = {
  onPress: PropTypes.func.isRequired,
  posterUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
};

import React from 'react';
import {
  Dimensions,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import Colors from '../config/Colors';
import Touchable from './Touchable';
import Label from './Label';
import { getTitleAndYear } from '../config/Utils';

class MovieCard extends React.Component {
  goToMovie = () => {
    const {
      id,
      navigation: {
        navigate
      },
    } = this.props;
    navigate({ routeName: 'Movie', params: { id }, key: id });
  }

  render() {
    const { width } = Dimensions.get('window');
    const {
      poster,
      title,
      year,
    } = this.props;

    const posterWidth = width / 3;
    const posterHeight = posterWidth * 1.55;

    return (
      <Touchable
        onPress={this.goToMovie}
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
          source={{ uri: poster }}
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
              {getTitleAndYear(title, year)}
            </Label>
          </LinearGradient>
        </ImageBackground>
      </Touchable>
    );
  }
}

MovieCard.propTypes = {
  poster: PropTypes.string,
  title: PropTypes.string,
  year: PropTypes.string,
};

export default withNavigation(MovieCard);
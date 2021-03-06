import React from 'react';
import {
  Text,
  Image,
  Dimensions,
} from 'react-native';
import { View } from 'react-native-animatable';

import { Color } from '../../utils';
import Touchable from '../Touchable';

class MovieItem extends React.Component {
  render() {
    const {
      id,
      title,
      posterImage,
      navigation,
    } = this.props;

    const { width } = Dimensions.get('window');
    const posterWidth = width / 3;
    const posterHeight = posterWidth * 1.55;

    return (
      <Touchable
        onPress={() => navigation.navigate('Movie', { id })}
      >
        <View
          style={{
            width: posterWidth,
          }}
        >
          <Image
            style={{
              borderRadius: 4,
              width: posterWidth,
              height: posterHeight,
              justifyContent: 'flex-end',
            }}
            source={{ uri: posterImage }}
          />
          <Text
            style={{
              padding: 5,
              fontSize: 12,
              textAlign: 'center',
            }}
            numberOfLines={2}
          >
            {title}
          </Text>
        </View>
      </Touchable>
    );
  }
};

export default MovieItem;

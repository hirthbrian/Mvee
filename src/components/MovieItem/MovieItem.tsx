import React from 'react';
import { useNavigation } from 'react-navigation-hooks';
import {
  Text,
  Image,
  Dimensions,
} from 'react-native';
import { View } from 'react-native-animatable';

import { Color } from '../../utils';
import Touchable from '../Touchable';


const MovieItem = ({
  id,
  posterImage,
  title,
}: {
  id: number,
  posterImage: string,
  title: string,
}) => {
  const { navigate } = useNavigation();
  const { width } = Dimensions.get('window');
  const posterWidth = width / 3;
  const posterHeight = posterWidth * 1.55;

  return (
    <Touchable
      onPress={() => navigate('Movie', { id })}
    >
      <View
        style={{
          width: posterWidth,
        }}
      >
        <Image
          style={{
            borderRadius: 6,
            width: posterWidth,
            height: posterHeight,
            justifyContent: 'flex-end',
          }}
          source={{ uri: posterImage }}
        />
        <Text
          style={{
            padding: 5,
            textAlign: 'center',
          }}
          numberOfLines={2}
        >
          {title}
        </Text>
      </View>
    </Touchable>
  );
};

export default MovieItem;

import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Color } from '../../utils';

import styles from './styles';

const starIcon = require('../../assets/img/star.png');

const SearchItem = ({
  id,
  title,
  posterImage,
  voteAverage,
  year,
  onPress,
}: {
  id: number,
  title: string,
  posterImage: string,
  voteAverage: number,
  year: string,
  onPress: any,
}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(id, title)}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          backgroundColor: Color.White,
        }}
      >
        <Image
          style={{
            height: 75,
            width: 75 / 1.55,
            borderRadius: 4,
          }}
          source={{ uri: posterImage }}
        />
        <View
          style={{
            flex: 1,
            padding: 10,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              paddingBottom: 3,
            }}
            numberOfLines={2}
          >
            {title}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                color: Color.LightBlack,
              }}
            >
              {year}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  paddingRight: 3,
                  color: Color.LightBlack,
                }}
              >
                {voteAverage}
              </Text>
              <Image
                source={starIcon}
                style={{
                  width: 15,
                  height: 15,
                  tintColor: Color.Red,
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SearchItem;

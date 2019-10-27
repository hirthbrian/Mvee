import React from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Color } from '../../utils';
import styles from './styles';
import SectionTitle from '../SectionTitle';

const imdb = require('../../assets/img/imdb.png');
const metacritic = require('../../assets/img/metacritic.png');
const rottenTomatoes = require('../../assets/img/rotten_tomatoes.png');

const ratingImg = {
  Metacritic: metacritic,
  'Internet Movie Database': imdb,
  'Rotten Tomatoes': rottenTomatoes,
};

const getInfoByWebsite = (source: string, value: string) => {
  if (source === 'Metacritic') {
    return Number(value.split('/')[0]) / 100;
  }
  if (source === 'Internet Movie Database') {
    return Number(value.split('/')[0]) / 10;
  }
  if (source === 'Rotten Tomatoes') {
    return Number(value.split('%')[0]) / 100;
  }
};

function Ratings({
  ratings,
}: {
  ratings: { Source: string, Value: string }[]
}) {
  if (ratings.length === 0) return null;

  const { width } = Dimensions.get('window');

  const scoreText = (value, color, delay) => (
    <Animatable.Text
      animation="fadeIn"
      delay={800 + delay}
      style={{
        color,
        paddingLeft: 5,
        alignSelf: 'center',
        fontFamily: 'metropolis-bold',
      }}
    >
      {value}
    </Animatable.Text>
  );

  return (
    <View
      style={styles.detailBlock}
    >
      {ratings.map(({ Source, Value }, index) => {
        const percentage = getInfoByWebsite(Source, Value);

        return (
          <View
            key={Source}
            style={{
              paddingVertical: 2,
              paddingLeft: 10,
            }}
          >
            <View
              style={{
                height: 30,
                borderRadius: 4,
                overflow: 'hidden',
                flexDirection: 'row',
                backgroundColor: Color.Grey,
              }}
            >
              <Animatable.View
                useNativeDriver
                delay={200 + (100 * index)}
                animation={{
                  from: {
                    translateX: -width,
                  },
                  to: {
                    translateX: 0,
                  },
                }}
                style={{
                  flex: percentage,
                  paddingHorizontal: 5,
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  backgroundColor: Color.Red,
                }}
              >
                {percentage > 0.5 && scoreText(Value, Color.White, 500 + (150 * index))}
              </Animatable.View>

              {percentage < 0.5 && scoreText(Value, Color.Black, 500 + (150 * index))}

              <Image
                resizeMode="contain"
                source={ratingImg[Source]}
                style={{
                  top: 5,
                  left: 5,
                  position: 'absolute',
                  height: 20,
                  width: 40,
                }}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default Ratings;

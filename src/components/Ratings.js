import React from 'react';
import {
  Image,
  StyleSheet,
  View,
} from 'react-native';
import Colors from '../config/Colors';
import Label from './Label';

const ratingImg = {
  Metacritic: require('../assets/img/metacritic.png'),
  'Internet Movie Database': require('../assets/img/imdb.png'),
  'Rotten Tomatoes': require('../assets/img/rotten_tomatoes.png'),
};

export default class Ratings extends React.PureComponent {
  render() {
    const { ratings } = this.props;

    if (!ratings || ratings.length === 0) return null

    return (
      <View
        style={styles.detailBlock}
      >
        <Label
          fontWeight={200}
          style={styles.title}
        >
          Rating
        </Label>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          {ratings.map(rating => (
            <View
              key={rating.Source}
              style={{
                alignItems: 'center',
              }}
            >
              <Image
                resizeMode="contain"
                source={ratingImg[rating.Source]}
                style={{
                  height: 50,
                  width: 50,
                }}
              />
              <Label
                style={{
                  fontSize: 16,
                  paddingTop: 5,
                  color: Colors.lightBlack,
                }}
              >
                {rating.Value}
              </Label>
            </View>
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  detailBlock: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  title: {
    color: Colors.black,
    fontSize: 28,
    paddingBottom: 10,
  },
});
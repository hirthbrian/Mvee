import React from 'react';
import {
  FlatList,
  View,
  Dimensions,
} from 'react-native';
import moment from 'moment';
import PropTypes from 'prop-types';
import Placeholder from 'rn-placeholder';
import Colors from '../config/Colors';
import Poster from './Poster';
import Label from './Label';

export default class MovieList extends React.Component {
  renderItem = (data) => {
    const movie = data.item;

    return (
      <Poster
        title={movie.title}
        year={moment(movie.release_date).format('Y')}
        posterUrl={movie.poster_path}
        onPress={this.props.onPress(movie)}
      />
    );
  };

  render() {
    const { width } = Dimensions.get('window');

    const emptyArray = [0, 1, 2];

    const posterWidth = width / 3;
    const posterHeight = posterWidth * 1.55;

    return (
      <View>
        <Label
          fontWeight={200}
          style={{
            fontSize: 28,
            color: Colors.white,
            padding: 10,
          }}
        >
          {this.props.title}
        </Label>
        {this.props.loading ?
          <View
            style={{
              flexDirection: 'row',
              paddingLeft: 10,
            }}
          >
            {emptyArray.map(data => (
              <View
                key={data}
                style={{
                  paddingLeft: 5,
                }}
              >
                <Placeholder.Box
                  animate="fade"
                  color={Colors.grey}
                  width={posterWidth}
                  height={posterHeight}
                  radius={4}
                />
              </View>
            ))
            }
          </View> :
          <FlatList
            horizontal
            data={this.props.data}
            renderItem={this.renderItem}
            showsHorizontalScrollIndicator={false}
            ListHeaderComponent={() => <View style={{ width: 10 }} />}
            ListFooterComponent={() => <View style={{ width: 10 }} />}
            ItemSeparatorComponent={() => <View style={{ width: 5 }} />}
            keyExtractor={(item, index) => `movie-${index}`}
          />
        }
      </View>
    );
  }
}

MovieList.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  onPress: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

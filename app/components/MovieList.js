import React from 'react';
import {
  FlatList,
  View,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import Colors from '../config/Colors';
import MovieCard from './MovieCard';
import Label from './Label';

export default class MovieList extends React.Component {
  renderItem = ({ item }) => {
    const {
      id,
      title,
      year,
      poster,
    } = item;

    return (
      <MovieCard
        id={id}
        title={title}
        year={year}
        poster={poster}
      />
    );
  };

  render() {
    const { title } = this.props;
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
          {title}
        </Label>
        <FlatList
          horizontal
          data={this.props.data}
          renderItem={this.renderItem}
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={() => <View style={{ width: 10 }} />}
          ListFooterComponent={() => <View style={{ width: 10 }} />}
          ItemSeparatorComponent={() => <View style={{ width: 5 }} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

MovieList.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array,
};

import React from 'react';
import {
  Text,
  View,
  FlatList,
} from 'react-native';
import MovieItem from '../MovieItem';
import SectionTitle from '../SectionTitle';

class MovieList extends React.Component {
  renderItem = ({ item }) => {
    const { id, title, poster } = item;

    return (
      <MovieItem
        id={id}
        title={title}
        posterImage={poster}
      />
    );
  };

  render() {
    const {
      data,
      title,
    } = this.props;

    return (
      <View>
        <SectionTitle title={title} />
        <FlatList
          horizontal
          data={data}
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

export default MovieList;

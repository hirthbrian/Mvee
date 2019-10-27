import React from 'react';
import {
  Text,
  View,
  FlatList,
} from 'react-native';
import MovieItem from '../MovieItem';
import SectionTitle from '../SectionTitle';

function MovieList({ data, title }) {
  const renderItem = ({ item }) => {
    const { id, title, poster } = item;

    return (
      <MovieItem
        id={id}
        title={title}
        posterImage={poster}
      />
    );
  };

  return (
    <View>
      <SectionTitle title={title} />
      <FlatList
        horizontal
        data={data}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={() => <View style={{ width: 10 }} />}
        ListFooterComponent={() => <View style={{ width: 10 }} />}
        ItemSeparatorComponent={() => <View style={{ width: 5 }} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

export default MovieList;

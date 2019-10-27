import React from 'react';
import {
  FlatList,
  View,
} from 'react-native';
import CastItem from '../CastItem';
import SectionTitle from '../SectionTitle';

function CastList({
  cast,
}: {
  cast: object,
}) {
  const renderItem = ({ item }) => {
    const {
      id,
      name,
      character,
      picture
    } = item;

    return (
      <CastItem
        id={id}
        actorName={name}
        characterName={character}
        picture={picture}
      />
    );
  };

  return (
    <View>
      <SectionTitle title="Cast" />
      <FlatList
        horizontal
        data={cast}
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

export default CastList;

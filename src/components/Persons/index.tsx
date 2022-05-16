import React from "react";
import { FlatList, View } from "react-native";

import Item from "./components/Item";
import SectionTitle from "../SectionTitle";
import { Props } from "./types";

const Persons = ({ title, persons }: Props) => {
  const renderItem = ({ item }) => {
    const { id, name, character, picture } = item;

    return <Item id={id} title={name} subtitle={character} image={picture} />;
  };

  return (
    <>
      <SectionTitle title={title} />
      <FlatList
        horizontal
        data={persons}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={() => <View style={{ width: 10 }} />}
        ListFooterComponent={() => <View style={{ width: 10 }} />}
        ItemSeparatorComponent={() => <View style={{ width: 5 }} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </>
  );
};

export default Persons;

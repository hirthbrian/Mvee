import React from "react";
import { FlatList } from "react-native";

import { Item } from "./components";
import SectionTitle from "../SectionTitle";
import { Header, Separator } from "./styles";
import { Props } from "./types";
import { MovieSimple } from "../../types";

const Movies = ({ title, data }: Props) => {
  const renderItem = ({ item }: { item: MovieSimple }) => {
    const { id, title, poster, year } = item;

    return <Item id={id} title={title} posterImage={poster} year={year} />;
  };

  const renderHeader = () => <Header />;

  const renderSeparator = () => <Separator />;

  return (
    <>
      <SectionTitle title={title} />
      <FlatList
        horizontal
        data={data}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderHeader}
        ItemSeparatorComponent={renderSeparator}
        keyExtractor={(item, index) => index.toString()}
      />
    </>
  );
};

export default Movies;

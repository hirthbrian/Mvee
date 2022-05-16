import React from "react";
import {
  View,
  Image,
  Linking,
  FlatList,
  Pressable,
  Dimensions,
} from "react-native";
import SectionTitle from "./SectionTitle";

function Videos({ videos }: { videos: { url: string; thumbnail: string } }) {
  const { width } = Dimensions.get("window");

  const renderItem = ({ item }) => (
    <Pressable onPress={() => Linking.openURL(item.url)}>
      <Image
        style={{
          width: width / 2,
          height: width / 2 / 1.77,
          borderRadius: 4,
        }}
        source={{ uri: item.thumbnail }}
      />
    </Pressable>
  );

  return (
    <View>
      <SectionTitle title="Videos" />
      <FlatList
        horizontal
        data={videos}
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

export default Videos;

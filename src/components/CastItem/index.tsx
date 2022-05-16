import React from "react";
import { View, Text, Image, Dimensions, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Color } from "../../utils";

const CastItem = ({
  id,
  actorName,
  characterName,
  picture,
}: {
  id: number;
  actorName: string;
  characterName: string;
  picture: string;
}) => {
  const navigation = useNavigation();
  const { width } = Dimensions.get("window");

  return (
    <Pressable onPress={() => navigation.navigate("Cast", { id })}>
      <View
        style={{
          width: width / 4,
        }}
      >
        <Image
          style={{
            width: width / 4,
            height: (width / 4) * 1.5,
            borderRadius: 4,
          }}
          source={{ uri: picture }}
        />
        <View
          style={{
            paddingVertical: 2,
            paddingHorizontal: 5,
          }}
        >
          <Text
            style={{
              fontSize: 10,
              textAlign: "center",
              color: Color.Black,
            }}
            numberOfLines={2}
          >
            {actorName}
          </Text>
          <Text
            style={{
              fontSize: 10,
              textAlign: "center",
              color: Color.LightBlack,
            }}
            numberOfLines={1}
          >
            {characterName}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default CastItem;

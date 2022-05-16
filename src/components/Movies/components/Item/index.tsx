import React from "react";
import { useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Container, Poster, Title, SubTitle } from "./styles";
import { Props } from "./types";

const Item = ({ id, title, posterImage, year }: Props) => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const posterWidth = width / 2.7;
  const posterHeight = posterWidth * 1.55;

  const onPress = () => navigation.navigate("Movie", { id });

  return (
    <Container width={posterWidth} onPress={onPress}>
      <Poster
        width={posterWidth}
        height={posterHeight}
        source={{ uri: posterImage }}
      />
      <Title numberOfLines={1}>{title}</Title>
      <SubTitle>{year}</SubTitle>
    </Container>
  );
};

export default Item;

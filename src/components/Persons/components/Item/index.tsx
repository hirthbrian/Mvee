import React from "react";
import { useNavigation } from "@react-navigation/native";

import { Props } from "./types";
import { Container, Image, TitleContainer, Title, Subtitle } from "./styles";

const Item = ({ id, title, subtitle, image }: Props) => {
  const navigation = useNavigation();

  const onPress = () => navigation.navigate("Cast", { id });

  return (
    <Container onPress={onPress} width={200}>
      <Image source={{ uri: image }} />
      <TitleContainer>
        <Title numberOfLines={1}>{title}</Title>
        {subtitle && <Subtitle numberOfLines={1}>{subtitle}</Subtitle>}
      </TitleContainer>
    </Container>
  );
};

export default Item;

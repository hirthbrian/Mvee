import React from "react";

import Item from "./Item";
import { Container } from "./styles";

const Ratings = ({
  ratings,
}: {
  ratings: { Source: string; Value: string }[];
}) => {
  if (ratings.length === 0) return null;

  const renderItem = ({ Source, Value }, index) => (
    <Item index={index} source={Source} value={Value} />
  );

  return <Container>{ratings.map(renderItem)}</Container>;
};

export default Ratings;

import React from "react";
import { FadeIn, SlideInLeft } from "react-native-reanimated";

import { Color } from "../../../utils";
import { Container, ScoreText, ProgressBar, Logo } from "./styles";

const imdb = require("../../../assets/img/imdb.png");
const metacritic = require("../../../assets/img/metacritic.png");
const rottenTomatoes = require("../../../assets/img/rotten_tomatoes.png");

const ratingImg = {
  Metacritic: metacritic,
  "Internet Movie Database": imdb,
  "Rotten Tomatoes": rottenTomatoes,
};

const Item = ({ index, source, value }) => {
  const getInfoByWebsite = () => {
    if (source === "Metacritic") {
      return Number(value.split("/")[0]) / 100;
    }
    if (source === "Internet Movie Database") {
      return Number(value.split("/")[0]) / 10;
    }
    if (source === "Rotten Tomatoes") {
      return Number(value.split("%")[0]) / 100;
    }
    return 0;
  };

  const percentage = getInfoByWebsite();

  const scoreText = (color: string) => (
    <ScoreText color={color} entering={FadeIn.delay(1300 + 150 * index)}>
      {value}
    </ScoreText>
  );

  return (
    <Container>
      <ProgressBar
        percentage={percentage}
        entering={SlideInLeft.delay(200 + 100 * index).duration(1000)}
      >
        {percentage > 0.5 && scoreText(Color.White)}
      </ProgressBar>
      {percentage < 0.5 && scoreText(Color.Black)}
      <Logo resizeMode="contain" source={ratingImg[source]} />
    </Container>
  );
};

export default Item;

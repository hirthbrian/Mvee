import React, { useEffect, useState } from "react";
import { Text, useWindowDimensions, ScrollView } from "react-native";
import moment from "moment";
import { useRoute } from "@react-navigation/native";

import Loading from "../../components/Loading";
import { Movies, Info, Persons } from "../../components";
import Videos from "../../components/Videos";
import Ratings from "../../components/Ratings";

import {
  Container,
  BackgroundImage,
  TitleContainer,
  PosterContainer,
  Poster,
  Title,
  Tagline,
  Synopsis,
} from "./styles";
import SectionTitle from "../../components/SectionTitle";
import { getMovie } from "../../api/movie";
import { MovieType } from "../../types";

const Movie = () => {
  const route = useRoute();
  const { width } = useWindowDimensions();
  const [movie, setMovie] = useState<MovieType | undefined>();

  useEffect(() => {
    getMovie(route?.params?.id).then((data) => setMovie(data));
  }, []);

  if (!movie) return null;

  const {
    ratings,
    videos,
    actors,
    similar,
    synopsis,
    backdrop,
    title,
    poster,
    tagline,
    date,
    runtime,
    directors,
    writers,
  } = movie;

  const posterWidth = width / 3;
  const posterHeight = posterWidth * 1.55;

  return (
    <Container>
      <BackgroundImage
        width={width}
        height={width / 2}
        source={{ uri: backdrop }}
      />
      <TitleContainer>
        <PosterContainer>
          <Poster
            width={posterWidth}
            height={posterHeight}
            source={{ uri: poster }}
          />
          <Ratings ratings={ratings} />
        </PosterContainer>
        <Title numberOfLines={3}>{title}</Title>
        {tagline.length && <Tagline numberOfLines={2}>{tagline}</Tagline>}
      </TitleContainer>
      <Info
        title="Writers"
        content={writers.map((item) => item.name).join(", ")}
      />
      <Info title="Release Date" content={moment(date).format("D MMM YYYY")} />
      <Info title="Runtime" content={`${runtime}min`} />
      <Persons title="Director" persons={directors} />
      <SectionTitle title="Summary" />
      <Synopsis>{synopsis}</Synopsis>
      <Videos videos={videos} />
      <Persons title="Casts" persons={actors} />
      <Movies title="Similar Movies" data={similar} />
    </Container>
  );
};

export default Movie;

import React, { useEffect } from "react";
import { View, Text, Image, Dimensions } from "react-native";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import CustomScrollView from "../../components/CustomScrollView";
import { Color, convertMinsToHrsMins } from "../../utils";
import Loading from "../../components/Loading";
import MovieList from "../../components/MovieList";
import CastList from "../../components/CastList";
import Videos from "../../components/Videos";
import Ratings from "../../components/Ratings";
import Summary from "../../components/Summary";
import InfoText from "../../components/InfoText";

import styles from "./styles";
import SectionTitle from "../../components/SectionTitle";
import { RootState } from "../../redux/store";
import { getMovie } from "../../redux/features/movieSlice";

const Movie = () => {
  const movie = useSelector((state: RootState) => state.movie.movie);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovie(navigation.getParam("id")));
  }, []);

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

  const { width } = Dimensions.get("window");
  const posterWidth = width / 3;
  const posterHeight = posterWidth * 1.55;

  return (
    <CustomScrollView backgroundImage={backdrop}>
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 15,
          paddingBottom: 25,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginTop: -100,
          }}
        >
          <Image
            source={{ uri: poster }}
            style={{
              borderColor: Color.White,
              borderWidth: 2,
              borderRadius: 6,
              width: posterWidth,
              height: posterHeight,
              backgroundColor: Color.White,
            }}
          />
          <Ratings ratings={ratings} />
        </View>

        <Text
          style={{
            paddingTop: 15,
            fontFamily: "metropolis-bold",
            fontSize: 42,
          }}
          numberOfLines={3}
        >
          {title}
        </Text>

        {tagline.length > 0 && (
          <Text
            style={{
              paddingTop: 5,
              fontFamily: "metropolis",
              fontSize: 16,
            }}
            numberOfLines={2}
          >
            {tagline}
          </Text>
        )}
      </View>
      <InfoText
        infoTitle="Director"
        infoContent={directors.map((item) => item.name).join(", ")}
      />
      <InfoText
        infoTitle="Writers"
        infoContent={writers.map((item) => item.name).join(", ")}
      />
      <InfoText
        infoTitle="Release Date"
        infoContent={moment(date).format("D MMM YYYY")}
      />
      <InfoText
        infoTitle="Runtime"
        infoContent={convertMinsToHrsMins(runtime)}
      />
      <SectionTitle title="Summary" />
      <Text
        style={{
          paddingHorizontal: 10,
        }}
      >
        {synopsis}
      </Text>
      <Videos videos={videos} />
      <CastList cast={actors} />
      <MovieList title="Similar Movies" data={similar} />
    </CustomScrollView>
  );
};

export default Movie;

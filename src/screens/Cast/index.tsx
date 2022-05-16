import React, { useEffect } from "react";
import { View, Text, Image, Dimensions, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import { Color } from "../../utils";
import Loading from "../../components/Loading";
import MovieList from "../../components/MovieList";
import InfoText from "../../components/InfoText";
import SectionTitle from "../../components/SectionTitle";
import { RootState } from "../../redux/store";
import { getCast } from "../../redux/features/castSlice";

const Cast = () => {
  const cast = useSelector((state: RootState) => state.cast.cast);
  const loading = useSelector((state: RootState) => state.cast.isFetching);
  const dispatch = useDispatch();

  const { getParam } = useNavigation();
  const { width } = Dimensions.get("window");
  const creditWidth = width / 3;
  const creditHeight = (width / 3) * 1.55;

  useEffect(() => {
    dispatch(getCast(getParam("id")));
  }, []);

  if (loading) return <Loading />;

  const { name, picture, birthday, deathday, biography, credits } = cast;

  return (
    <ScrollView>
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          alignItems: "flex-end",
        }}
      >
        <Image
          source={{ uri: picture }}
          style={{
            borderColor: Color.White,
            backgroundColor: Color.Grey,
            borderWidth: 2,
            borderRadius: 6,
            width: creditWidth,
            height: creditHeight,
          }}
        />
        <View
          style={{
            flex: 1,
            paddingLeft: 10,
          }}
        >
          <InfoText infoTitle="Born" infoContent={birthday} />
          {deathday && <InfoText infoTitle="Died" infoContent={deathday} />}
        </View>
      </View>

      <Text
        style={{
          padding: 10,
          fontSize: 38,
          fontFamily: "metropolis-bold",
        }}
      >
        {name}
      </Text>

      <SectionTitle title="Biography" />

      <Text
        style={{
          padding: 10,
          color: Color.Black,
        }}
      >
        {biography}
      </Text>

      <MovieList title="Filmography" data={credits.cast} />
    </ScrollView>
  );
};

export default Cast;

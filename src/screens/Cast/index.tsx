import React, { useEffect, useState } from "react";
import { View, Text, Image, Dimensions, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";

import { Color } from "../../utils";
import Loading from "../../components/Loading";
import Movies from "../../components/Movies";
import { Info } from "../../components";
import SectionTitle from "../../components/SectionTitle";
import { getCast } from "../../api/cast";

const Cast = () => {
  const route = useRoute();
  const [cast, setCast] = useState(null);

  const { width } = Dimensions.get("window");
  const creditWidth = width / 3;
  const creditHeight = (width / 3) * 1.55;

  useEffect(() => {
    getCast(route.params.id).then((data) => setCast(data));
  }, []);

  if (!cast) return null;

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
          <Info title="Born" content={birthday} />
          {deathday && <Info title="Died" content={deathday} />}
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

      <Movies title="Filmography" data={credits.cast} />
    </ScrollView>
  );
};

export default Cast;

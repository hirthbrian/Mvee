import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";

import Movies from "../../components/Movies";
import Loading from "../../components/Loading";
import Search from "../Search";

import styles from "./styles";
import { getHomepage } from "../../api/movie";

const Home = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [popular, setPopular] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    getHomepage()
      .then((values) => {
        setPopular(values[0]);
        setUpcoming(values[1]);
        setNowPlaying(values[2]);
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  }, []);

  const goToMovie = (id: number, title: string) => {
    // const { navigation, hideSearchModal } = this.props;
    // hideSearchModal();
    // navigation.navigate({ routeName: "Movie", params: { id, title } });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Search goToMovie={goToMovie} />
      <ScrollView style={styles.container}>
        <Movies title="Now Playing" data={nowPlaying} />
        <Movies title="Popular" data={popular} />
        <Movies title="Upcoming" data={upcoming} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

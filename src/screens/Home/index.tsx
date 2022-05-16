import React, { useEffect } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import MovieList from "../../components/MovieList";
import Loading from "../../components/Loading";
import Search from "../Search";

import styles from "./styles";
import { RootState } from "../../redux/store";
import { getHomepage } from "../../redux/features/homepageSlice";

const Home = () => {
  const nowPlaying = useSelector(
    (state: RootState) => state.homepage.nowPlaying
  );
  const popular = useSelector((state: RootState) => state.homepage.popular);
  const upcoming = useSelector((state: RootState) => state.homepage.upcoming);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHomepage());
  }, []);

  const goToMovie = (id: number, title: string) => {
    const { navigation, hideSearchModal } = this.props;
    hideSearchModal();
    navigation.navigate({ routeName: "Movie", params: { id, title } });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Search goToMovie={goToMovie} />
      <ScrollView style={styles.container}>
        <MovieList title="Now Playing" data={nowPlaying} />
        <MovieList title="Popular" data={popular} />
        <MovieList title="Upcoming" data={upcoming} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

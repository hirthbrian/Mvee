import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import moment from "moment";

import { apiKey, omdbUrl, omdbKey, axiosInstance } from "../../utils";

export interface HomepageState {
  upcoming: Array<object>;
  popular: Array<object>;
  nowPlaying: Array<object>;
  isFetching: boolean;
}

const initialState: HomepageState = {
  upcoming: [],
  popular: [],
  nowPlaying: [],
  isFetching: true,
};

const mapToPoster = (item) => ({
  id: item.id,
  title: item.title,
  year: moment(item.release_date).format("Y"),
  poster: `https://image.tmdb.org/t/p/w185/${item.poster_path}`,
});

export const getPopularMovies = () =>
  axiosInstance
    .get("/movie/popular", {
      params: {
        api_key: apiKey,
      },
    })
    .then(({ data }) => data.results.map(mapToPoster));

export const getUpcomingMovies = () =>
  axiosInstance
    .get("/movie/upcoming", {
      params: {
        api_key: apiKey,
      },
    })
    .then(({ data }) => data.results.map(mapToPoster));

export const getNowPlayingMovies = () =>
  axiosInstance
    .get("/movie/now_playing", {
      params: {
        api_key: apiKey,
      },
    })
    .then(({ data }) => data.results.map(mapToPoster));

export const homepageSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    getCast: (state) => {
      state.isFetching = true;

      const popular = getPopularMovies();
      const upcoming = getUpcomingMovies();
      const nowPlaying = getNowPlayingMovies();

      Promise.all([popular, upcoming, nowPlaying])
        .then((values) => {
          state.isFetching = false;
          state.popular = values[0];
          state.upcoming = values[1];
          state.nowPlaying = values[2];
        })
        .catch((error) => {
          console.log("error", error.message);
          state.isFetching = false;
        });
    },
  },
});

// Action creators are generated for each case reducer function
export const { getCast } = homepageSlice.actions;

export default homepageSlice.reducer;

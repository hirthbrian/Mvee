import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import moment from "moment";

import { apiKey, omdbUrl, omdbKey, axiosInstance } from "../../utils";

export interface SearchState {
  id: number;
  title: string;
  isFetching: boolean;
}

const initialState: SearchState = {
  id: 0,
  title: "",
  isFetching: false,
};

export const getMovieRatings = (imdbId) =>
  axios
    .get(omdbUrl, {
      params: {
        apikey: omdbKey,
        i: imdbId,
      },
    })
    .then(({ data }) => data.Ratings);

export const getMovieCredits = (id) =>
  axiosInstance
    .get(`/movie/${id}/credits`, {
      params: {
        api_key: apiKey,
      },
    })
    .then(({ data }) => {
      const actors = data.cast
        .filter((item) => item.profile_path)
        .map((item) => ({
          id: item.id,
          name: item.name,
          character: item.character,
          picture: `https://image.tmdb.org/t/p/w185/${item.profile_path}`,
        }));

      const directors = data.crew
        .filter((item) => item.job === "Director")
        .map((item) => ({
          id: item.id,
          name: item.name,
        }));

      const writers = data.crew
        .filter((item) => item.department === "Writing")
        .map((item) => ({
          id: item.id,
          name: item.name,
        }));

      return {
        actors,
        directors,
        writers,
      };
    });

export const getMovieVideos = (id) =>
  axiosInstance
    .get(`/movie/${id}/videos`, {
      params: {
        api_key: apiKey,
      },
    })
    .then(({ data }) =>
      data.results.map((item) => ({
        id: item.id,
        name: item.name,
        url: `https://www.youtube.com/watch?v=${item.key}`,
        thumbnail: `https://img.youtube.com/vi/${item.key}/hqdefault.jpg`,
      }))
    );

export const getMovieSimilar = (id) =>
  axiosInstance
    .get(`/movie/${id}/similar`, {
      params: {
        api_key: apiKey,
      },
    })
    .then(({ data }) =>
      data.results
        .filter((item) => item.poster_path && item.vote_count)
        .sort((itemA, itemB) => itemA.popularity < itemB.popularity)
        .map((item) => ({
          id: item.id,
          title: item.title,
          year: item.release_date && moment(item.release_date).format("Y"),
          poster: `https://image.tmdb.org/t/p/w185/${item.poster_path}`,
        }))
    );

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    getMovie: (state, action) => {
      const { id } = action.payload;
      state.isFetching = true;
      axiosInstance
        .get(`/movie/${id}`, {
          params: {
            api_key: apiKey,
          },
        })
        .then(({ data }) => {
          const ratings = getMovieRatings(data.imdb_id);
          const credits = getMovieCredits(data.id);
          const videos = getMovieVideos(data.id);
          const similar = getMovieSimilar(data.id);

          Promise.all([ratings, credits, videos, similar])
            .then((values) => {
              const movie = {
                id: data.id,
                imdbId: data.imdb_id,
                title: data.title,
                tagline: data.tagline,
                synopsis: data.overview,
                date: data.release_date,
                runtime: data.runtime,
                poster: `https://image.tmdb.org/t/p/w780/${data.poster_path}`,
                backdrop: `https://image.tmdb.org/t/p/w780/${data.backdrop_path}`,
                ratings: values[0],
                actors: values[1].actors,
                directors: values[1].directors,
                writers: values[1].writers,
                videos: values[2],
                similar: values[3],
              };
              state.isFetching = false;
            })
            .catch(() => {
              state.isFetching = false;
            });
        })
        .catch(() => {
          state.isFetching = false;
        });
    },
  },
});

// Action creators are generated for each case reducer function
export const { getMovie } = movieSlice.actions;

export default movieSlice.reducer;

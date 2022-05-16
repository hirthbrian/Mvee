import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import moment from "moment";

import { apiKey, omdbUrl, omdbKey, axiosInstance } from "../../utils";

export interface CastState {
  id: number;
  title: string;
  isFetching: boolean;
}

const initialState: CastState = {
  id: 0,
  title: "",
  isFetching: false,
};

export const getCastCredits = (id) =>
  axiosInstance
    .get(`/person/${id}/movie_credits`, {
      params: {
        api_key: apiKey,
      },
    })
    .then(({ data }) => ({
      id: data.id,
      cast: data.cast
        .filter((item) => item.poster_path && item.vote_count)
        .sort((itemA, itemB) => itemA.popularity < itemB.popularity)
        .map((item) => ({
          id: item.id,
          title: item.title,
          year: item.release_date && moment(item.release_date).format("Y"),
          poster: `https://image.tmdb.org/t/p/w185/${item.poster_path}`,
        })),
      crew: data.crew
        .filter((item) => item.poster_path && item.vote_count)
        .sort((itemA, itemB) => itemA.popularity < itemB.popularity)
        .map((item) => ({
          id: item.id,
          title: item.title,
          year: item.release_date && moment(item.release_date).format("Y"),
          poster: `https://image.tmdb.org/t/p/w185/${item.poster_path}`,
        })),
    }));

export const getCastImages = (id) =>
  axiosInstance
    .get(`/person/${id}/tagged_images`, {
      params: {
        api_key: apiKey,
      },
    })
    .then(({ data }) =>
      data.results.map(
        (item) => `https://image.tmdb.org/t/p/w780/${item.file_path}`
      )
    );

export const castSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    getCast: (state, action) => {
      const { id } = action.payload;
      state.isFetching = true;
      axiosInstance
        .get(`/person/${id}`, {
          params: {
            api_key: apiKey,
          },
        })
        .then(({ data }) => {
          const credits = getCastCredits(data.id);
          const gallery = getCastImages(data.id);

          Promise.all([credits, gallery])
            .then((values) => {
              const cast = {
                id: data.id,
                name: data.name,
                birthday:
                  data.birthday && moment(data.birthday).format("D MMM YYYY"),
                deathday:
                  data.deathday && moment(data.deathday).format("D MMM YYYY"),
                biography: data.biography,
                picture: `https://image.tmdb.org/t/p/w500/${data.profile_path}`,
                credits: values[0],
                gallery: values[1],
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
export const { getCast } = castSlice.actions;

export default castSlice.reducer;

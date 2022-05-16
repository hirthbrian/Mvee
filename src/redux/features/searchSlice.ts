import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";

import { axiosInstance, apiKey } from "../../utils";

export interface SearchState {
  results: Array<object>;
  loading: boolean;
  isSearchModalVisible: boolean;
}

const initialState: SearchState = {
  results: [],
  loading: false,
  isSearchModalVisible: false,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    search: (state, action) => {
      const { page, query = 1 } = action.payload;

      state.results = [];
      state.loading = true;

      axiosInstance
        .get("/search/movie", {
          params: {
            page,
            query,
            api_key: apiKey,
          },
        })
        .then(({ data }) => {
          const results = data.results
            .filter((item) => item.poster_path && item.vote_count)
            .map((item) => ({
              id: item.id,
              title: item.title,
              overview: item.overview,
              voteAverage: item.vote_average,
              year: item.release_date && moment(item.release_date).format("Y"),
              poster: `https://image.tmdb.org/t/p/w185/${item.poster_path}`,
            }));
          state.loading = false;
          state.results = results;
        })
        .catch(() => {
          state.loading = false;
        });
    },
    showSearchModal: (state) => {
      state.isSearchModalVisible = true;
    },
    hideSearchModal: (state, action: PayloadAction<number>) => {
      state.isSearchModalVisible = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { search, showSearchModal, hideSearchModal } = searchSlice.actions;

export default searchSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import castSlice from "./features/castSlice";
import homepageSlice from "./features/homepageSlice";
import movieSlice from "./features/movieSlice";
import searchSlice from "./features/searchSlice";

export const store = configureStore({
  reducer: {
    cast: castSlice,
    movie: movieSlice,
    search: searchSlice,
    homepage: homepageSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

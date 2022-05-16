import { configureStore } from "@reduxjs/toolkit";
import castSlice from "./features/castSlice";
import searchSlice from "./features/searchSlice";

export const store = configureStore({
  reducer: {
    cast: castSlice,
    search: searchSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

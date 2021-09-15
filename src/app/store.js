import { configureStore } from "@reduxjs/toolkit";

import heroesReducer from "../features/heroesSlice";

export const store = configureStore({
  reducer: {
    heroes: heroesReducer,
  },
});

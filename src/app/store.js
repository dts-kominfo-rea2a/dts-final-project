import { configureStore } from "@reduxjs/toolkit";

import { recipeAPI } from "../services/recipeAPI";

export const store = configureStore({
  reducer: {
    [recipeAPI.reducerPath]: recipeAPI.reducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(recipeAPI.middleware);
  },
});

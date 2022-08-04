import { configureStore } from "@reduxjs/toolkit";

import { serviceApi } from "../service/serviceApi";

export const store = configureStore({
  reducer: {
    [serviceApi.reducerPath]: serviceApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(serviceApi.middleware);
  },
});
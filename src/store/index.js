import { configureStore } from "@reduxjs/toolkit";
import userStore from "./userStore";
import { miaowbookApi } from "../services/miaowbookApiRtk";

export const store = configureStore({
    reducer: {
        userStore,
        [miaowbookApi.reducerPath]: miaowbookApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(miaowbookApi.middleware)
    }
})
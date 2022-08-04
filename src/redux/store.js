/** === NEW REDUX TOOLKIT === */
import { configureStore } from "@reduxjs/toolkit";
// import { setupListeners } from "@reduxjs/toolkit/dist/query";
import themes from "./themes/themeSlice"
import postReducer from "./features/posts/postsSlice"
import { postsService } from "../services/postsService";
import { authService } from "../services/authService";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    themes,
    posts: postReducer,
    [postsService.reducerPath]: postsService.reducer,
    [authService.reducerPath]: authService.reducer
  },

  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(authService.middleware)
})

setupListeners(store.dispatch)

/** === OLD === */
// import { applyMiddleware, legacy_createStore as createStore } from "redux";
// import thunk from "redux-thunk";
// import reducers from "./reducers/index";

// export default createStore(reducers, applyMiddleware(thunk));

/**
 * author : Riki Joni Iskandar
 * email: rikijoniiskandar97@gmail.com
 */
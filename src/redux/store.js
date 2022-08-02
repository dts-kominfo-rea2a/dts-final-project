/** === NEW REDUX TOOLKIT === */
import { configureStore } from "@reduxjs/toolkit";
// import { setupListeners } from "@reduxjs/toolkit/dist/query";
import themes from "./themes/themeSlice"
import postReducer from "./features/posts/postsSlice"
import { postsService } from "../services/postsService";

export default configureStore({
  reducer: {
    themes,
    posts: postReducer,
    [postsService.reducerPath]: postsService.reducer,
  },
})

/** === OLD === */
// import { applyMiddleware, legacy_createStore as createStore } from "redux";
// import thunk from "redux-thunk";
// import reducers from "./reducers/index";

// export default createStore(reducers, applyMiddleware(thunk));

/**
 * author : Riki Joni Iskandar
 * email: rikijoniiskandar97@gmail.com
 */
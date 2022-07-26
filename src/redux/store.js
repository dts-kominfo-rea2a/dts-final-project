import { applyMiddleware, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers/index";

export default createStore(reducers, applyMiddleware(thunk));

/**
 * author : Riki Joni Iskandar
 * email: rikijoniiskandar97@gmail.com
 */
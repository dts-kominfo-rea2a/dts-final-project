import { combineReducers } from "redux";

import snackbarNotifications from "./snackbarNotifications";
import selectedTheme from "./selectedTheme";

export default combineReducers({ snackbarNotifications, selectedTheme });

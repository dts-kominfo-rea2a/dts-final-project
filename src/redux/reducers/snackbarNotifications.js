const snackbarNotifications = (state = {}, action) => {
  switch (action.type) {
    case "NOTIFICATION_WELCOME":
      return {
        ...state,
        snackbarOpen: true,
        color: "info",
        snackbarMessage: action.message,
      };
    case "NOTIFICATION_SUCCESS":
      return {
        ...state,
        snackbarOpen: true,
        color: "success",
        snackbarMessage: action.message,
      };
    case "NOTIFICATION_ERROR":
      return {
        ...state,
        snackbarOpen: true,
        color: "error",
        snackbarMessage: action.message,
      };
    case "CLOSE_NOTIFICATION":
      return {
        ...state,
        snackbarOpen: false,
      }
    default:
      return state;
  }
};

export default snackbarNotifications;

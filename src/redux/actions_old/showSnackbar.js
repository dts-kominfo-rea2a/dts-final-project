export const snackbarWelcome = message => {
  return dispatch => {
    dispatch({ type: 'NOTIFICATION_WELCOME', message })
  }
}


export const snackbarSuccess = message => {
  return dispatch => {
    dispatch({ type: 'NOTIFICATION_SUCCESS', message })
  }
}

export const snackbarError = message => {
  return dispatch => {
    dispatch({ type: 'NOTIFICATION_ERROR', message })
  }
}

export const clearSnackbar = () => {
  return dispatch => {
    dispatch({ type: "CLOSE_NOTIFICATION"});
  }
}
export const themeSelected = (mode) => {
  return dispatch => {
    dispatch({ type: 'DARK', mode})
  }
}
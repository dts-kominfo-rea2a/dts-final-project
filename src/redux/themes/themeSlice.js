import { createSlice } from "@reduxjs/toolkit";

const  initialState = {
  darkMode: !!JSON.parse(localStorage.getItem("darkMode")),
}

export const themeSlice = createSlice({
  name: "themes",
  initialState,
  reducers: {
    switchTheme: (state) => {
      state.darkMode = !state.darkMode;
     
    },
  },
});

export const asyncToggleTheme = () => (dispatch) => {
  const isDarkMode = !!JSON.parse(localStorage.getItem("darkMode"));
  localStorage.setItem("darkMode", !isDarkMode);
  dispatch(switchTheme());
};

//create action
export const { switchTheme } = themeSlice.actions;

export default themeSlice.reducer;

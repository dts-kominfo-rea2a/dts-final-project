import { createSlice } from "@reduxjs/toolkit";

// const jwt = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null

const initialState = {
  jwt: null,
  user: {},
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
    setCredentials: (state, action) => {
      state.user = action.payload
      state.jwt = action.payload
    }
  },
})

export const { logout, setCredentials } = authSlice.actions

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.user


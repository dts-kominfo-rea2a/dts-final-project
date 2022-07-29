import { createSlice } from "@reduxjs/toolkit"
import Logo from "../assets/logo.svg"

const tokenFromLocalStorage = localStorage.getItem('token') || null

const initialState = {
    isLoggedIn: tokenFromLocalStorage !== null,
    user: null,
    token: tokenFromLocalStorage
}

const storeTokenToLocalStorage = (token) => {
    localStorage.setItem('token', token);
}


const userStore = createSlice({
    name: 'userStore',
    initialState,
    reducers: {
        loggedIn(state) {
            state.isLoggedIn = true
        },
        setToken(state, action) {
            state.isLoggedIn = true;
            state.token = action.payload.token
            storeTokenToLocalStorage(action.payload.token)
        },
        setUser(state, action) {
            state.isLoggedIn = true
            state.user = {
                ...action.payload.user,
                profile_picture_url: action.payload.user.profile_picture_url === null ? Logo : action.payload.user.profile_picture_url
            }
        },
        notLoggedIn(state) {
            state.isLoggedIn = false
        }
    }
})

export const selectIsLoggedIn = (state) => state.userStore.isLoggedIn
export const selectToken = (state) => state.userStore.token
export const selectUser = (state) => state.userStore.user
// export const isUserValid = (state,) => state.userList.
export const { loggedIn, setToken, setUser, notLoggedIn } = userStore.actions

export default userStore.reducer
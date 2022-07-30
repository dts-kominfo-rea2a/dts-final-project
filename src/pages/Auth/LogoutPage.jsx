import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation, useMeQuery } from "../../services/miaowbookApiRtk";
import { loggedOut, selectIsLoggedIn } from "../../store/userStore";

const LogoutPage = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const dispatcher = useDispatch()
    const navigate = useNavigate()

    const [logout] = useLogoutMutation()

    useEffect(() => {
        if (isLoggedIn === false) {
            navigate('/')
        } else {
            const logoutApp = async () => {
                await logout()
                dispatcher(loggedOut())
                navigate('/')
            }

            logoutApp()
        }
    }, [isLoggedIn, navigate, logout, dispatcher])
    return (<>
    </>)
}

export default LogoutPage
import React, { useEffect } from "react";
import Container from "../../components/Container"
import BgPhoto from "../../assets/images/bg.jpg"
import Logo from "../../assets/logo.svg"
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { selectIsLoggedIn, setUser } from "../../store/userStore";
import { useDispatch, useSelector } from "react-redux";
import { useMeQuery } from "../../services/miaowbookApiRtk";

const AppTemplate = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const { data: me, error, isLoading } = useMeQuery()
    const dispatcher = useDispatch()

    useEffect(() => {
        if (!error && !isLoading) {
            console.log(me.data)
            dispatcher(setUser({
                user: me.data
            }))
            return;
        }
    }, [me, isLoading, error, dispatcher])


    return (

        !isLoading && !error && (
            <div>
                <div className="fixed w-full z-10">
                    <Navbar />
                </div>
                <Container size="sm">
                    <div className="md:w-10/12 mx-auto py-4 md:px-4 pt-14">
                        <Outlet />
                    </div>
                </Container>
            </div>
        )
    )
}

export default AppTemplate
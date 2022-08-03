import React, { useEffect } from "react";
import Container from "../../components/Container"
import BgPhoto from "../../assets/images/bg.jpg"
import Logo from "../../assets/logo.svg"
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { selectIsLoggedIn, setUser } from "../../store/userStore";
import { useDispatch, useSelector } from "react-redux";
import { useMeQuery } from "../../services/miaowbookApiRtk";
import Footer from "../../components/Footer";

const AppTemplate = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const { data: me, error, isLoading } = useMeQuery()
    const dispatcher = useDispatch()
    const navigate = useNavigate()

    const isMutating = useSelector(state => Object.values(state['miaowbook-api'].mutations).some(query => query.status === 'pending'))
    const isFetching = useSelector(state => Object.values(state['miaowbook-api'].queries).some(query => query.status === 'pending'))

    useEffect(() => {
        if (!error && !isLoading) {
            dispatcher(setUser({
                user: me.data
            }))
            return;
        }
    }, [me, isLoading, error, dispatcher])

    useEffect(() => {
        if (isLoggedIn === false) {
            navigate('/')
        }
    }, [isLoggedIn, navigate])
    return (

        !isLoading && !error && (
            <div>
                <div className="fixed w-full z-10">
                    <Navbar />
                    <div className="w-full mb-4">
                        <div className="animate-pulse flex">
                            <div className="flex-1">
                                <div className={`bg-gray-400 h-0.5 ${isMutating || isFetching ? 'visible' : 'invisible'}`}></div>
                            </div>
                        </div>
                    </div>

                </div>
                <Container size="sm">
                    <div className="md:w-10/12 mx-auto py-4 md:px-4 pt-14 min-h-screen">
                        <Outlet />
                    </div>
                </Container>
                <div className="w-full">
                    <Footer />
                </div>
            </div>
        )
    )
}

export default AppTemplate
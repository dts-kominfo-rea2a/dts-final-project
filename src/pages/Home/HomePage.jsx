import React, { useEffect, useState } from "react";
import Logo from "../../assets/logo.svg"
import DefaultButton from "../../components/Buttons/DefaultButton";
import SecondaryButton from "../../components/Buttons/SecondaryButton";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../store/userStore";
import useTitle from "../../hooks/useTitle";

const HomePage = () => {
    const isLoggedin = useSelector(selectIsLoggedIn)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(false)
        if (isLoggedin) {
            navigate('/timeline')
        }
    }, [isLoggedin, navigate])

    useTitle('Welcome to Miaowbook')
    return (
        <div>
            {
                !loading && (
                    <>
                        <img src={Logo} className="w-16 shadow-2xl mb-40" alt="MiaowBook Logo" />
                        <div className="text-5xl mb-10">Share your animal's story with the world!</div>
                        <h1 className="text-3xl">Join <span className="font-bold">MiaowBook</span> today.</h1>
                        <div className="mt-8 mb-5 gap-2 flex">
                            <Link to="/auth/register">
                                <SecondaryButton>Create an Account</SecondaryButton>
                            </Link>
                            <Link to="/auth/login"><DefaultButton>Login</DefaultButton></Link>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default HomePage
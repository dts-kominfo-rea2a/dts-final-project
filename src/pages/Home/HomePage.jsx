import React from "react";
import Logo from "../../assets/logo.svg"
import DefaultButton from "../../components/Buttons/DefaultButton";
import SecondaryButton from "../../components/Buttons/SecondaryButton";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div>
            <img src={Logo} className="w-16 shadow-2xl mb-40" alt="MiaowBook Logo" />
            <div className="text-5xl mb-10">Share your animal's story with the world!</div>
            <h1 className="text-3xl">Join <span className="font-bold">MiaowBook</span> today.</h1>
            <div className="mt-8 mb-5">
                <SecondaryButton>Create an Account</SecondaryButton>
                <Link to="/auth/login"><DefaultButton>Login</DefaultButton></Link>
            </div>
        </div>
    )
}

export default HomePage
import React from "react";
import Container from "../../components/Container"
import BgPhoto from "../../assets/images/bg.jpg"
import Logo from "../../assets/logo.svg"
import { Outlet } from "react-router-dom";

const HomepageTemplate = () => {
    return (
        <Container size="2xl">
            <div className="flex flex-col-reverse md:flex-row w-100 min-h-screen">
                <div
                    className="w-full md:w-1/2"
                    style={
                        { background: `url(${BgPhoto}) center / cover no-repeat` }
                    }>
                    <div className="bg-gray-800 w-full h-full bg-opacity-70 text-white">
                        <div className="w-full h-full flex justify-center items-center">
                            <div className="flex flex-col text-center gap-2 opacity-75 py-8 h-96 md:h-full">
                                {/* <img src={Logo} className="w-32 md:w-64 shadow-2xl" alt="MiaowBook Logo" /> */}
                                {/* <span>Social Media for Pets</span> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 p-5">
                    <Outlet />
                </div>
            </div>
        </Container>
    )
}

export default HomepageTemplate
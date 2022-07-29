import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHomeAlt } from "@fortawesome/free-solid-svg-icons"
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons"
import React from "react";
import Logo from "../assets/logo.svg"
import Container from "./Container";
import Input from "./Forms/Input";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../store/userStore";


const Navbar = () => {
    const user = useSelector(selectUser);

    return (
        <div className="border-b border-gray-300 bg-white py-2">
            <Container size="sm">
                <div className="w-10/12 md:w-8/12 mx-auto">
                    <div className="flex justify-between items-center">
                        <img src={Logo} className="w-8 shadow-2xl" alt="MiaowBook Logo" />
                        <div>
                            <Input type="text" size="small" placeholder="search" className="w-64" />
                        </div>
                        <div className="text-xl flex justify-items items-center gap-4">
                            <Link to="/timeline">
                                <button type="button" alt="home">
                                    <FontAwesomeIcon icon={faHomeAlt}></FontAwesomeIcon>
                                </button>
                            </Link>
                            <button type="button">
                                <FontAwesomeIcon icon={faPlusCircle}></FontAwesomeIcon>
                            </button>
                            <Link to={`/u/${user?.username}`} element="button">
                                <img src={Logo} alt="foto profile" className="rounded-full w-6 border-gray-600 border-1 border-spacing-2" />
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Navbar;
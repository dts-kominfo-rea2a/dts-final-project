import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHomeAlt } from "@fortawesome/free-solid-svg-icons"
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons"
import React, { useEffect, useRef, useState } from "react";
import Logo from "../assets/logo.svg"
import Container from "./Container";
import Input from "./Forms/Input";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../store/userStore";
import SearchBar from "./Elements/SearchBar";

const Navbar = () => {
    const user = useSelector(selectUser);

    const refDropDown = useRef();

    const [showDropdown, setShowDropdown] = useState(false);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (refDropDown.current && !refDropDown.current.contains(event.target)) {
                if (
                    event.target.id !== "navbar-dropdown-trigger"
                ) {
                    setShowDropdown(false);
                }
            }
        };
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, [showDropdown]);

    return (
        <div className="border-b border-gray-300 bg-white py-2">
            <Container size="sm">
                <div className="w-10/12 md:w-8/12 mx-auto">
                    <div className="flex justify-between items-center relative">
                        <Link to="/">
                            <img src={Logo} className="w-8 shadow-2xl" alt="MiaowBook Logo" />
                        </Link>
                        <div>
                            <div className="w-36 md:w-64">
                                <SearchBar />
                            </div>
                        </div>
                        <div className="text-xl flex justify-items items-center gap-4">
                            <Link to="/timeline">
                                <button type="button" alt="home">
                                    <FontAwesomeIcon icon={faHomeAlt}></FontAwesomeIcon>
                                </button>
                            </Link>
                            <Link to="/p/upload">
                                <button type="button">
                                    <FontAwesomeIcon icon={faPlusCircle}></FontAwesomeIcon>
                                </button>
                            </Link>
                            {/* <Link to={`/u/${user?.username}`} element="button" id="navbar-dropdown-trigger"> */}
                            <button onClick={(e) => setShowDropdown(!showDropdown)}>
                                <img id="navbar-dropdown-trigger" src={user?.profile_picture_url} alt="foto profile" className="rounded-full w-6 h-6 object-fit border-gray-600 border-1 border-spacing-2" />
                            </button>
                            {/* </Link> */}


                        </div>

                        <div ref={refDropDown} id="navbar-dropdown" className={`${showDropdown ? 'block' : 'hidden'} z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 top-12 right-0 absolute`}>
                            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault" onClick={(e) => setShowDropdown(false)}>
                                <li>
                                    <Link to={`/u/${user?.username}`} className="block py-2 px-4 hover:bg-gray-100">Profile</Link>
                                    <Link to={`/auth/logout`} className="block py-2 px-4 hover:bg-gray-100">Logout</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Container >
        </div >
    )
}

export default Navbar;
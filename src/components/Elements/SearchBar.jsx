import React, { useEffect, useState } from "react";
import Input from "../Forms/Input";
import useDebounce from "../../hooks/useDebounce";
import { useSearchUserQuery } from "../../services/miaowbookApiRtk";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

const SearchBar = () => {
    const [term, setTerm] = useState('')

    const debouncedTerm = useDebounce(term, 500)

    const { data, isLoading, isFetching, error } = useSearchUserQuery(debouncedTerm === '' ? skipToken : { term: debouncedTerm })

    const closeSearchBar = () => {
        setTerm('')
    }
    return (
        <div className="w-full">
            <Input type="text" size="small" placeholder="search" value={term} onChange={(e) => setTerm(e.target.value)} />
            <div className={`${term === '' ? 'hidden' : 'block'} z-10 w-56 md:w-72 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 top-12 left-1/2 absolute`} style={{ transform: 'translate(-60%, 0px)' }}>
                <div className="py-1 px-2 text-sm text-gray-700 dark:text-gray-200">
                    <div>
                        {
                            (isLoading || isFetching) && (
                                <div className="flex flex-wrap">
                                    <Spinner size="xs" />
                                    <span className="font-light">searching <span className="font-bold">{debouncedTerm}</span></span>
                                </div>
                            )
                        }

                        {
                            !(isLoading || isFetching) && (
                                <>
                                    {
                                        (data?.data || []).length <= 0 && (
                                            <>
                                                Empty Result
                                            </>
                                        )
                                    }
                                    <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
                                        {
                                            (data?.data || []).map(item => (
                                                <li key={item.id}>
                                                    <Link to={`/u/${item?.username}`} className="block py-2 px-4 hover:bg-gray-100" onClick={closeSearchBar}>
                                                        <div className="flex justify-between">
                                                            <div className="flex gap-2 w-full items-center">
                                                                <img className="w-6 h-6 object-cover rounded-full" src={item?.profile_picture_url} alt={item?.name} />
                                                                <span>{item?.username}</span>
                                                            </div>
                                                            <div>
                                                                {item?.user_type?.emoji}
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </li>

                                            ))
                                        }
                                        {/* <li>
                                        <Link to={`/u/${user?.username}`} className="block py-2 px-4 hover:bg-gray-100">Profile</Link>
                                        <Link to={`/auth/logout`} className="block py-2 px-4 hover:bg-gray-100">Logout</Link>
                                    </li> */}
                                    </ul>
                                </>
                                // (data?.data || []).map(item => (
                                //     <div className="flex w-full flex-col gap-2" key={item.id}>
                                //         <div className="flex gap-2 w-full">
                                //             <img className="w-8 h-8 object-cover rounded-full" src={item.profile_picture_url} alt={item.name} />
                                //         </div>
                                //     </div>
                                // ))
                            )
                        }


                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchBar
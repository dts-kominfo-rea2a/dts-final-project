import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/userStore";
import { faEdit } from "@fortawesome/free-regular-svg-icons"
import { useParams } from "react-router-dom";
import { useFindUserByUsernameQuery, useListUserPostQuery } from "../../services/miaowbookApiRtk";
import { skipToken } from "@reduxjs/toolkit/dist/query";
const UserProfilePage = () => {
    const { username } = useParams();

    const [posts, setPosts] = useState([])
    const [cursor, setCursor] = useState(null)

    const { data: user, isLoading, error } = useFindUserByUsernameQuery({ username })
    const { data: userPosts, errorUserPosts, isLoading: isUserPostLoading } = useListUserPostQuery(user?.id ? { user_id: user.id, cursor } : skipToken)


    return (
        <div className="pt-4 w-full md:w-10/12 mx-auto">
            {!isLoading && !error && (
                <div className="flex w-full">
                    <div className="w-4/12 p-3 flex justify-center items-center">
                        <div className="rounded-full relative">
                            <img className="border border-gray-600 border-spacing-2 rounded-full w-36 h-36" src={user?.profile_picture_url} alt={`${user?.name} profile`} style={{
                                objectFit: 'cover'
                            }} />

                        </div>
                    </div>
                    <div className="w-8/12 pt-4 flex flex-col gap-6 pr-2">
                        <h1 className="text-2xl">{user?.username}</h1>
                        <div className="flex gap-4">
                            <div>
                                <span className="font-bold">
                                    {user?.posts_count || 0}
                                </span>
                                <span className="pl-1">
                                    Posts
                                </span>
                            </div>
                            <div>
                                <span className="font-bold">
                                    {user?.followers_count}
                                </span>
                                <span className="pl-1">
                                    Followers
                                </span>
                            </div>
                            <div>
                                <span className="font-bold">
                                    {user?.followed_count}
                                </span>
                                <span className="pl-1">
                                    Followings
                                </span>
                            </div>


                        </div>
                        <div>
                            <h2 className="text-lg font-semibold">{user?.name}</h2>
                            <span className="text-sm text-gray-500">{user?.user_type.emoji} {user?.user_type.name}</span>
                            <p>{user?.bio}</p>
                        </div>
                    </div>
                </div>
            )}

            {
                !isUserPostLoading && !errorUserPosts && (
                    <></>
                )
            }
        </div>
    )
}

export default UserProfilePage
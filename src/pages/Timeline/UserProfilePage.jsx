import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { createRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/userStore";
import { faEdit } from "@fortawesome/free-regular-svg-icons"
import { Link, useParams } from "react-router-dom";
import { useFindUserByUsernameQuery, useListUserPostQuery, useUpdateProfilePictureMutation } from "../../services/miaowbookApiRtk";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import UserPost from "../../components/Elements/UserPost";
import InfiniteScroll from "react-infinite-scroller";
import FollowButton from "../../components/Elements/FollowButton";
import Spinner from "../../components/Elements/Spinner"
import useTitle from "../../hooks/useTitle";
import usePrevious from "../../hooks/usePrevious";
const UserProfilePage = () => {
    const { username } = useParams();
    useTitle(`${username}'s profile page `)
    const me = useSelector(selectUser)
    const [posts, setPosts] = useState([])
    const [cursor, setCursor] = useState(null)
    const { data: user, isLoading, error } = useFindUserByUsernameQuery({ username })
    const { data: userPosts, errorUserPosts, isLoading: isUserPostLoading, isFetching: isUserPostsFetching, isUserPostsUninitialized } = useListUserPostQuery(user?.id ? { user_id: user.id, cursor } : skipToken)

    const inputFileRef = createRef()

    const usernamePrev = usePrevious(username)

    useEffect(() => {
        if (username !== usernamePrev && usernamePrev !== undefined) {
            setCursor(null)
            setPosts([])
        }

        if (!errorUserPosts && !isUserPostLoading && !isUserPostsUninitialized && !isUserPostsFetching) {
            const newPosts = userPosts?.data?.data || []
            if (username !== usernamePrev || cursor === null) {
                setPosts(newPosts)
            } else {
                setPosts((posts) => {
                    const existingids = posts.map(({ id }) => id);
                    return [
                        ...posts,
                        ...newPosts.filter(({ id }) => existingids.indexOf(id) <= -1)
                    ]
                })
            }
        }
    }, [userPosts, errorUserPosts, isUserPostLoading, username, usernamePrev, isUserPostsFetching, isUserPostsUninitialized, cursor])

    const loadMorePostHandler = () => {
        if (isUserPostLoading || isUserPostsFetching) {
            return;
        }
        const nextCursor = userPosts?.data?.next_cursor;
        if (nextCursor === null) return;

        setCursor(nextCursor)
    }

    const [updateProfilePicture] = useUpdateProfilePictureMutation()

    const fileUploadHandler = (e) => {
        const file = inputFileRef.current.files[0] || null
        if (file === null) return;

        updateProfilePicture({
            photo: file
        })
        // inputFileRef.current.
    }
    return (
        <div className="pt-4 w-full md:w-10/12 mx-auto">
            {!isLoading && !error && (
                <div className="flex w-full pr-2">
                    <div className="w-4/12 p-3 flex justify-center items-center">
                        <div className="rounded-full relative">
                            <img className="border border-gray-600 border-spacing-2 rounded-full w-24 h-24 md:w-36 md:h-36" src={user?.profile_picture_url} alt={`${user?.name} profile`} style={{
                                objectFit: 'cover'
                            }} />
                            {
                                me?.id === user?.id && (
                                    <div
                                        className="flex justify-center items-center absolute bg-gray-700 top-0 w-full h-full rounded-full opacity-0 hover:opacity-25 cursor-pointer"
                                        onClick={(e) => inputFileRef.current.click()}
                                    >
                                        <form className="hidden">
                                            <input type="file" ref={inputFileRef} accept="image/*" onChange={fileUploadHandler} />
                                        </form>
                                        <span className="text-sm text-gray-50">Change Picture</span>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="w-8/12 pt-4 flex flex-col gap-6 pr-2">
                        <div className="flex gap-4 items-center">
                            <h1 className="text-2xl">{user?.username}</h1>
                            <FollowButton userId={user?.id} isFollowed={user?.is_followed} />
                            {
                                me?.id === user?.id && (
                                    <Link to="/profile/edit">
                                        <button type="button" className="h-6 border text-sm border-gray-300 px-2 rounded-md hover:bg-gray-200">
                                            Edit Profile
                                        </button>
                                    </Link>
                                )
                            }
                        </div>
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
                    <InfiniteScroll
                        className="flex w-full flex-wrap mt-8"
                        threshold={0}
                        pageStart={0}
                        loadMore={loadMorePostHandler}
                        hasMore={userPosts?.data?.next_cursor != null}
                        loader={<div key="0" className="text-center flex w-1/3 justify-center md:p-2 items-center relative"><Spinner size="md" /></div>}
                    >
                        {
                            posts.map(post => (
                                <UserPost key={post.id} post={post} />
                            ))
                        }
                    </InfiniteScroll>

                )
            }
        </div>
    )
}

export default UserProfilePage
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faComment, faHeart as faHeartEmpty } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FollowButton from "../../components/Elements/FollowButton";
import { useCommentPostMutation, useDeletePostMutation, useDetailPostQuery, useListPostCommentQuery } from "../../services/miaowbookApiRtk";
import { transformResponse } from "../../utils/utils";
import LikeButton from "../../components/Elements/LikeButton";
import useTitle from "../../hooks/useTitle";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/userStore";
import Swal from "sweetalert2";
import { toast } from "../../utils/tools";

const PostDetailPage = () => {
    useTitle('Post')
    const { post_id } = useParams()
    const [newComment, setNewComment] = useState("")
    const [isPostingComment, setIsPostingComment] = useState("")
    const [cursor, setCursor] = useState(null)
    const [comments, setComments] = useState([])
    const me = useSelector(selectUser);
    const { data, isLoading, error, isFetching } = useDetailPostQuery({ post_id })

    const { data: paginatedCommentData, error: listCommentError, isLoading: isListCommentLoading, isFetching: isListCommentFetching } = useListPostCommentQuery({ post_id, cursor })

    const humanDiffDate = moment(data?.data?.created_at).fromNow();

    const [commentPost] = useCommentPostMutation()

    const refDropdown = useRef()
    const [showDropdown, setShowDropdown] = useState(false);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (refDropdown.current && !refDropdown.current.contains(event.target)) {
                // console.log(event.target, event.target.parentElement)
                if (
                    !event.target.parentElement.classList.contains("post-dropdown-trigger")
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

    const addComment = async () => {
        setIsPostingComment(true)
        const { isOk, data, message, error } = transformResponse(await commentPost({
            id: post_id,
            content: newComment
        }));

        if (isOk) {
            setNewComment("");
        }
        setIsPostingComment(false);
    }

    useEffect(() => {
        if (!listCommentError && !isListCommentLoading) {
            const newComments = paginatedCommentData?.data?.data || []
            setComments((comments) => {
                const existingids = comments.map(({ id }) => id);
                return [
                    ...comments,
                    ...newComments.filter(({ id }) => existingids.indexOf(id) <= -1)
                ].sort((a, b) => ((a.created_at > b.created_at) ? -1 : ((a.created_at < b.created_at) ? 1 : 0)))
            })
        }
    }, [paginatedCommentData, listCommentError, isListCommentLoading])

    const loadMoreComment = () => {
        if (isListCommentLoading || isListCommentFetching) {
            return;
        }
        const nextCursor = paginatedCommentData?.data?.next_cursor;
        if (nextCursor === null) return;
        console.log(nextCursor)
        setCursor(nextCursor)
    }

    const [deletePost] = useDeletePostMutation()
    const navigate = useNavigate()

    const deletePostHandler = async () => {
        const username = data?.data?.user?.username

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'bg-gray-600',
                cancelButton: 'bg-gray-200'
            },
            buttonsStyling: true
        })

        const { isConfirmed } = await swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            confirmButtonColor: "red",
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        })

        if (isConfirmed) {
            const { isOk, message, status } = transformResponse(await deletePost({ id: post_id }))
            toast({ title: message, icon: status || 'error'})
            if (isOk) {
                navigate(`/u/${username}`)
            }
        }
    }


    const user_name = data?.data?.user?.name || null
    useTitle(user_name === null ? 'Post' : `${user_name}'s post`)


    return (
        <div className="pt-4 w-full md:w-10/12 mx-auto">
            {
                !isLoading && !error && (
                    <div className="flex bg-white border border-gray-100 rounded-md" style={{
                        minHeight: "calc(100vh - 8rem)"
                    }}>
                        <div className="w-7/12 bg-gray-900 flex items-center">
                            <img className="w-full" src={data?.data?.media_url} alt={data?.data?.caption} />
                        </div>
                        <div className="w-5/12 mt-3 ml-3 mr-0 md:mr-2 relative">
                            <div className="flex justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="relative">
                                        <img src={data?.data?.user?.profile_picture_url} alt="foto profile" className="rounded-full w-8 h-8 object-cover border-gray-600 border border-spacing-2" />
                                        <div className="absolute -bottom-1 -right-1 border-spacing-2">
                                            <span className="">😺</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <Link to={`/u/${data?.data?.user?.username}`}>
                                            <span className="font-bold">{data?.data?.user?.name}</span>
                                        </Link>
                                        <FollowButton isFollowed={data?.data?.user?.is_followed} userId={data?.data?.user?.id} onlyShowFollow={true} />
                                    </div>
                                </div>
                                <button className="post-dropdown-trigger" onClick={(e) => setShowDropdown(!showDropdown)}>
                                    <svg aria-label="More options" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
                                </button>
                            </div>

                            <div ref={refDropdown} id="navbar-dropdown" className={`${showDropdown ? 'block' : 'hidden'} z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 top-12 right-0 absolute`}>
                                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault" onClick={(e) => setShowDropdown(false)}>
                                    {
                                        me?.id === data?.data?.user?.id && (
                                            <li onClick={deletePostHandler}>
                                                <span className="block py-2 px-4 hover:bg-gray-100 w-full cursor-pointer" role="button">
                                                    <FontAwesomeIcon icon={faTrash} /> Delete This
                                                </span>
                                            </li>
                                        )
                                    }
                                </ul>
                            </div>

                            <hr className="mt-2" />

                            <div className="flex flex-col h-[calc(100%-4rem)]">
                                <div className="grow flex flex-col gap-2 text-sm mt-4 overflow-scroll h-4/6">
                                    <div>
                                        <Link to={`/u/${data?.data?.user?.username}`}>
                                            <span className="font-bold">{data?.data?.user?.username}</span>
                                        </Link> <span>{data?.data?.caption}</span> <span className="text-gray-400">{humanDiffDate}</span>
                                    </div>

                                    {
                                        paginatedCommentData?.data?.next_cursor !== null && (
                                            <button
                                                className="flex justify-center text-gray-400" disabled={isListCommentFetching || isListCommentLoading}
                                                onClick={loadMoreComment}
                                            >
                                                <span>{isListCommentFetching ? 'Loading...' : 'Load older comments'}</span>
                                            </button>
                                        )
                                    }
                                    {
                                        comments.length > 0 && (
                                            comments.slice().reverse().map(comment => (
                                                <div key={comment.id}>
                                                    <Link to={`/u/${comment.user?.username}`}>
                                                        <span className="font-bold">{comment.user?.username}</span>
                                                    </Link> <span>{comment.content}</span> <span className="text-gray-400">{moment(comment.created_at).fromNow()}</span>
                                                </div>
                                            ))
                                        )
                                    }
                                </div>
                                <div className="h-1/6 flex flex-col items-end border-t border-gray-300">
                                    <div className="w-full flex py-3 gap-4">

                                        <div className="flex gap-2">
                                            <LikeButton postId={data?.data?.id} liked={data?.data?.is_liked} />
                                            <div className="text-sm">
                                                <span className="font-bold">{data?.data?.likes_count}</span>
                                            </div>
                                        </div>


                                        <button>
                                            <div className="flex gap-2">
                                                <FontAwesomeIcon icon={faComment} size="lg" />
                                                <div className="text-sm">
                                                    <span className="font-bold">{data?.data?.comments_count}</span>
                                                </div>
                                            </div>
                                        </button>
                                    </div>
                                    <div className="flex w-full h-full justify-center items-center">
                                        <textarea disabled={isPostingComment} rows="1" className="block mx-0 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-gray-500 focus:border-gray-500" placeholder="add comment" onClick={(e) => e.target.select()} value={newComment} onChange={(e) => setNewComment(e.target.value)}></textarea>
                                        <button type="submit" className="inline-flex justify-center p-2 text-gray-600 rounded-full cursor-pointer" onClick={addComment} disabled={isPostingComment}>
                                            <svg aria-hidden="true" className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
                                            <span className="sr-only">Send message</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                )
            }
        </div >
    )
}

export default PostDetailPage
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Logo from "../../assets/logo.svg"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { faHeart as faHeartEmpty } from "@fortawesome/free-regular-svg-icons"
import { faComment } from "@fortawesome/free-regular-svg-icons"
import moment from "moment";
import { Link } from "react-router-dom";
import { useLikePostMutation, useUnlikePostMutation } from "../../services/miaowbookApiRtk";
import { transformResponse } from "../../utils/utils";
import LikeButton from "./LikeButton";
const Post = ({ post }) => {
    const humanDiffDate = moment(post?.created_at).fromNow();
    const [likeCounts, setLikeCounts] = useState(post.likes_count)
    const onLikeUpdateHandler = (payload) => {
        setLikeCounts(likeCounts + payload.likes_count);
    }
    return (
        <div className="w-full">
            <div className="w-full md:border border-solid border-gray-300 md:rounded-md bg-white pb-4">
                <div className="flex justify-between items-center p-2">
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <img src={post?.user.profile_picture_url} alt="foto profile" className="rounded-full w-8 h-8 object-cover border-gray-600 border border-spacing-2" />
                            <div className="absolute -bottom-1 -right-1 border-spacing-2">
                                <span className="">{post?.user?.user_type?.emoji}</span>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <Link to={`/u/${post.user.username}`}>
                                <span className="font-bold">{post.user.name}</span>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <button>
                            <svg aria-label="More options" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
                        </button>
                    </div>
                </div>

                <hr className=" bg-gray-300" />
                <img className="w-full" src={post.media_url} alt="timeline" />
                <div className="flex flex-col pt-4 px-4 gap-2 text-sm">
                    <div className="gap-4 flex">
                        <LikeButton postId={post.id} liked={post.is_liked} onUpdate={onLikeUpdateHandler} />
                        <button>
                            <div className="flex gap-2"><FontAwesomeIcon icon={faComment} size="xl" />
                                <div className="text-sm">
                                    <span className="font-bold">{post.comments_count} comments</span>
                                </div>
                            </div>
                        </button>
                    </div>
                    <div className="text-sm">
                        {
                            likeCounts <= 0
                                ? (<span>be the first to like this photo</span>)
                                : (<span className="font-bold">{likeCounts} likes</span>)
                        }
                    </div>
                    <div className="">
                        <p className="text-sm"><span className="font-bold">{post?.user?.username}</span> {post?.caption}</p>
                    </div>
                    <div className="text-gray-400">
                        {humanDiffDate}
                    </div>
                    <div className="border-t border-gray-300 pt-2">
                        <div className="flex flex-row w-full text-center">
                            <div className="w-1/2">
                                <Link to={`/u/${post.user.username}`}>
                                    View Profile
                                </Link>
                            </div>
                            <div className="w-1/2 border-l border-gray-300">
                                <Link to={`/p/${post.id}`}>
                                    View Post
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
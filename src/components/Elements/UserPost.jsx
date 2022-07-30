import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartEmpty, faComment as faCommentEmpty } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const UserPost = ({ post }) => {
    return (
        <Link className="flex w-1/3 h-1/3 justify-center md:p-2 items-center relative" to={`/p/${post.id}`}>
            <img src={post.thumb_url} className="w-full h-full object-cover" alt={post.caption} />
            <div className="absolute w-full h-full flex">
                <div className="hover:opacity-60 flex justify-center items-center w-full  bg-gray-700 opacity-0 md:m-2 text-white gap-8">
                    <div className="gap-4">
                        <span><FontAwesomeIcon icon={post.is_liked ? faHeart : faHeartEmpty} size="lg" color='white' /> </span>
                        <span className="text-lg">{post.likes_count}</span>
                    </div>
                    <div className="gap-4">
                        <span><FontAwesomeIcon icon={post.comments_count > 0 ? faComment : faCommentEmpty} size="lg" color='white' /> </span>
                        <span className="text-lg">{post.comments_count}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default UserPost
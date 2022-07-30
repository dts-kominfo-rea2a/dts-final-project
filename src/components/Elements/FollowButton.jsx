import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useFollowUserMutation, useUnfollowUserMutation } from "../../services/miaowbookApiRtk";
import { selectUser } from "../../store/userStore";

const FollowButton = ({ userId, onlyShowFollow = false, ...props }) => {
    const [isFollowed, setIsFollowed] = useState(props.isFollowed)
    const user = useSelector(selectUser)

    const [follow] = useFollowUserMutation()
    const [unfollow] = useUnfollowUserMutation()

    const clickHandler = () => {
        if (isFollowed) {
            unfollow({ user_id: userId })
        } else {
            follow({ user_id: userId })
        }

        setIsFollowed(!isFollowed)
    }

    const isAllowed = user?.id !== userId && (isFollowed ? !onlyShowFollow : true)
    return (
        <>
            {
                isAllowed && <button type="button" className="h-6 border text-sm border-gray-300 px-2 rounded-md hover:bg-gray-200" onClick={clickHandler}>
                    {isFollowed ? 'Unfollow' : 'Follow'}
                </button>
            }
        </>
    )
}

export default FollowButton
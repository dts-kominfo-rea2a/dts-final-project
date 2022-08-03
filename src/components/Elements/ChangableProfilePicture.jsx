import React, { createRef } from "react";
import { useSelector } from "react-redux";
import { useUpdateProfilePictureMutation } from "../../services/miaowbookApiRtk";
import { selectUser } from "../../store/userStore";

const ChangableProfilePicture = ({ user, size = 'md'}) => {
    const me = useSelector(selectUser)

    const [updateProfilePicture] = useUpdateProfilePictureMutation()

    const inputFileRef = createRef()

    const fileUploadHandler = (e) => {
        const file = inputFileRef.current.files[0] || null
        if (file === null) return;

        updateProfilePicture({
            photo: file
        })
        // inputFileRef.current.
    }
    return (
        <div className="flex justify-center items-center">
            <div className="rounded-full relative">
                <img className={`border border-gray-600 border-spacing-2 rounded-full ${size === 'md' ? 'w-24 h-24 md:w-36 md:h-36' : ''} ${size === 'lg' ? 'w-36 h-36 md:w-48 md:h-48' : ''}`} src={user?.profile_picture_url} alt={`${user?.name} profile`} style={{
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
    )
}

export default ChangableProfilePicture
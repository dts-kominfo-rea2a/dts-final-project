import React, { createRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import TextArea from "../../components/Forms/TextArea";
import { selectUser } from "../../store/userStore";
import SecondaryButton from "../../components/Buttons/SecondaryButton";
import { toast } from "../../utils/tools";
import { transformResponse } from "../../utils/utils";
import { useCreatePostMutation } from "../../services/miaowbookApiRtk";
import useTitle from "../../hooks/useTitle";
import Spinner from "../../components/Elements/Spinner";
const CreatePostPage = () => {
    useTitle("Create new post")
    const user = useSelector(selectUser)
    const inputFileRef = createRef()
    const [photo, setPhoto] = useState(null)
    const [photoPreviewUrl, setPhotoPreviewUrl] = useState(null)
    const [caption, setCaption] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [createPostApi] = useCreatePostMutation()
    const navigate = useNavigate()

    const handleSelectPhoto = (e) => {
        const [file] = e.target.files
        if (file) {
            setPhoto(file)
            setPhotoPreviewUrl(URL.createObjectURL(file))
        }
    }

    const createPost = async (e) => {
        if (photo === null) {
            return toast({ title: "Please select photo first", icon: "error" })
        }
        if (caption === null || caption?.length < 3) {
            return toast({ title: "Please type some caption", icon: "error" })
        }

        setIsLoading(true)

        const req = transformResponse(await createPostApi({
            caption: caption,
            media: photo
        }));
        const { isOk, data, message } = req

        setIsLoading(false);
        if (!isOk) {
            return toast({ title: message, icon: "error" })
        }

        toast({ title: "Post has been uploaded", icon: "success" })
        navigate(`/u/${data.user.username}`)

    }

    return (
        <div className="pt-4 w-full md:w-10/12 mx-auto">
            <div className="flex md:flex-row flex-col bg-white border border-gray-100 rounded-md h-48 md:h-auto" style={{
                minHeight: "calc(100vh - 8rem)"
            }}>
                <div className={`w-full md:w-7/12 ${photo === null ? 'bg-gray-100' : 'bg-gray-900'} flex items-center`}>
                    <form className="hidden">
                        <input type="file" ref={inputFileRef} accept="image/*" onChange={handleSelectPhoto} />
                    </form>
                    {
                        photo == null && (
                            <div className="flex w-full h-full justify-center items-center cursor-pointer" role="button" onClick={(e) => {
                                !isLoading && inputFileRef.current.click()
                            }}>
                                <span>Click to add photo</span>
                            </div>
                        )
                    }
                    {
                        photoPreviewUrl != null && (
                            <div className="relative w-full -h-full">
                                <img className="w-full" src={photoPreviewUrl} alt="preview" />
                                <div className="absolute top-0 flex w-full h-full justify-center bg-gray-700 items-center cursor-pointer opacity-0 hover:opacity-75" role="button" onClick={(e) => {
                                    !isLoading && inputFileRef.current.click()
                                }}>
                                    <span>Click to change photo</span>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className="w-full md:w-5/12 mt-3 ml-3">
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <img src={user?.profile_picture_url} alt="foto profile" className="rounded-full w-8 h-8 object-cover border-gray-600 border border-spacing-2" />
                            <div className="absolute -bottom-1 -right-1 border-spacing-2">
                                <span className="">{user?.user_type?.emoji}</span>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <Link to={`/u/${user?.username}`}>
                                <span className="font-bold">{user?.name}</span>
                            </Link>
                        </div>
                    </div>

                    <div className="flex flex-col h-[calc(100%-4rem)]">
                        <div className="grow flex flex-col gap-2 text-sm mt-4 h-4/6 p-2 md:mr-0 mr-4">
                            <TextArea
                                disabled={isLoading}
                                rows="8"
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                                label="Caption" />

                            <div className="flex justify-end">
                                <SecondaryButton type="submit" disabled={isLoading} onClick={createPost}>
                                    {
                                        isLoading ?
                                            (
                                                <div className="flex items-center">
                                                    <Spinner size="xs" /> Uploading..
                                                </div>
                                            )
                                            : (<>Post</>)
                                    }
                                </SecondaryButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePostPage
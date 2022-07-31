import React, { useState } from "react";
import DefaultButton from "../../../components/Buttons/DefaultButton";
import SecondaryButton from "../../../components/Buttons/SecondaryButton";
import Spinner from "../../../components/Elements/Spinner";
import TextArea from "../../../components/Forms/TextArea";
import { useUpdatePostMutation } from "../../../services/miaowbookApiRtk";
import { toast } from "../../../utils/tools";
import { transformResponse } from "../../../utils/utils";

const EditCaption = ({ post, callback = null }) => {
    const [updatePost, { isLoading }] = useUpdatePostMutation()
    const [caption, setCaption] = useState(post?.caption)

    const updatePostHandler = async () => {
        if (caption === null || caption?.length < 3) {
            return toast({ title: "Please type some caption", icon: "error" })
        }


        const req = transformResponse(await updatePost({
            post_id: post?.id,
            caption: caption,
        }));
        const { isOk, data, message } = req
        if (callback) {
            callback({ success: isOk })
        }
        if (!isOk) {
            return toast({ title: message, icon: "error" })
        }

        toast({ title: "Post has been Updated", icon: "success" })
    }
    return (
        <div className="flex flex-col gap-2 mt-2">
            <TextArea
                disabled={isLoading}
                rows="8"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                label="Caption" />

            <div className="flex gap-2 justify-end">

                {
                    callback && (
                        <SecondaryButton type="button" disabled={isLoading} onClick={() => callback({ cancel: true })}>
                            Cancel
                        </SecondaryButton>
                    )
                }
                <DefaultButton type="submit" disabled={isLoading} onClick={updatePostHandler}>
                    {
                        isLoading ?
                            (
                                <div className="flex items-center">
                                    <Spinner size="xs" /> Updating..
                                </div>
                            )
                            : (<>Save</>)
                    }
                </DefaultButton>

            </div>
        </div>
    )
}

export default EditCaption
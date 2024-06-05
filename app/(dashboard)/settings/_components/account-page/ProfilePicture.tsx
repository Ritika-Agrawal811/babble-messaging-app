"use client"

import clsx from "clsx"
import axios from "axios"
import { useRouter } from "next/navigation"
import { handleRequestError } from "@/app/_libs/handleRequestError"

import type { CloudinaryUploadWidgetInfo, CloudinaryUploadWidgetResults } from "next-cloudinary"

// components
import Avatar from "@/app/_components/Avatar"
import Button from "@/app/_components/Button"
import { CldUploadButton } from "next-cloudinary"
import toast from "react-hot-toast"

interface ProfilePictureProps {
    image: string
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ image }) => {
    const router = useRouter()

    const uploadProfilePicture = async (result: CloudinaryUploadWidgetResults) => {
        const uploadInfo = result?.info as CloudinaryUploadWidgetInfo
        const uploadURL = uploadInfo.secure_url

        try {
            const response = await axios.post("/api/settings/update/profilephoto", {
                image: uploadURL,
            })

            if (response.status !== 200) throw new Error("Failed to upload new profile photo")

            toast.success("Your profile picture is successfully updated!")
            router.refresh()
        } catch (error) {
            handleRequestError(error)
        }
    }

    const removeProfilePicture = async () => {
        try {
            const response = await axios.post("/api/settings/remove/profilephoto")

            if (response.status !== 200) throw new Error("Failed to remove profile photo")

            toast.success("Your profile picture is successfully removed!")
            router.refresh()
        } catch (error) {
            handleRequestError(error)
        }
    }

    return (
        <section>
            <div className={clsx("flex gap-8", "flex-col lg:flex-row", "items-start lg:items-center")}>
                <Avatar image={image} size='large' showStatus={false} />

                <div>
                    <h4 className='text-xl font-medium text-gray-900'>Profile Picture</h4>
                    <p className='text-gray-700'>This image will be displayed to everyone.</p>
                    <div className='mt-4 flex gap-4'>
                        <CldUploadButton
                            options={{ maxFiles: 1 }}
                            onSuccess={uploadProfilePicture}
                            uploadPreset='messenger_preset'
                        >
                            <span
                                className={clsx(
                                    "rounded-md px-4 py-3 font-semibold transition duration-100",
                                    "whitespace-nowrap text-sm md:text-base",
                                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                                    "bg-sky-500 text-white hover:bg-sky-600 focus-visible:bg-sky-600"
                                )}
                            >
                                Upload New
                            </span>
                        </CldUploadButton>
                        <Button type='button' variant='secondary' onClick={removeProfilePicture}>
                            Remove Profile Picture
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProfilePicture

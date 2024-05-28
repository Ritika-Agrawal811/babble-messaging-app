"use client"

import clsx from "clsx"
import axios from "axios"
import { useForm } from "react-hook-form"
import useConversation from "@/app/_hooks/useConversation"
import { handleRequestError } from "@/app/_libs/handleRequestError"

import type { FieldValues, SubmitHandler } from "react-hook-form"
import type { CloudinaryUploadWidgetInfo, CloudinaryUploadWidgetResults } from "next-cloudinary"

// components
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2"
import Input from "@/app/_components/inputs/Input"
import { CldUploadButton } from "next-cloudinary"

const MessageInputField = () => {
    const { conversationId } = useConversation()

    // initializing react-hook-form for message form
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FieldValues>({ defaultValues: { message: "" } })

    // a function to handle message submission to our database via /api/messages POST endpoint
    const onSubmitHandler: SubmitHandler<FieldValues> = async (data) => {
        try {
            const response = await axios.post("/api/messages", {
                ...data,
                conversationId,
            })

            if (response.status !== 200) throw new Error("Failed to send message")
        } catch (error) {
            handleRequestError(error)
        } finally {
            setValue("message", "", { shouldValidate: true })
        }
    }

    // a function to upload image to cloudinary and store its url in the database via /api/messages POST endpoint
    const imageUploadHandler = async (result: CloudinaryUploadWidgetResults) => {
        const uploadInfo = result?.info as CloudinaryUploadWidgetInfo
        const uploadURL = uploadInfo.secure_url

        try {
            const response = await axios.post("/api/messages", {
                image: uploadURL,
                conversationId,
            })

            if (response.status !== 200) throw new Error("Failed to upload image")
        } catch (error) {
            handleRequestError(error)
        }
    }

    return (
        <section className={clsx("bg-gray-100 shadow-sm", "px-2 py-4 md:px-4", "flex items-center gap-4")}>
            <CldUploadButton options={{ maxFiles: 1 }} onSuccess={imageUploadHandler} uploadPreset='messenger_preset'>
                <HiPhoto className='cursor-pointer text-2xl text-gray-800 transition-colors duration-100 hover:text-sky-500' />
            </CldUploadButton>

            <form onSubmit={handleSubmit(onSubmitHandler)} id='message-form' className='grow'>
                <Input
                    id='message'
                    label='Message'
                    type='text'
                    placeholder='Type a message'
                    autocomplete='off'
                    register={register}
                    errors={errors}
                    showLabel={false}
                    required={true}
                />
            </form>
            <button
                type='submit'
                form='message-form'
                className='rounded-full bg-sky-500 p-2 transition-colors duration-100 hover:bg-sky-600'
            >
                <HiPaperAirplane className='text-xl text-white' />
            </button>
        </section>
    )
}

export default MessageInputField

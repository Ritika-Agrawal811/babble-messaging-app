"use client"

import clsx from "clsx"
import axios from "axios"
import { useForm } from "react-hook-form"
import useConversation from "@/app/_hooks/useConversation"
import { handleRequestError } from "@/app/_libs/handleRequestError"

import type { FieldValues, SubmitHandler } from "react-hook-form"

// components
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2"
import Input from "@/app/_components/inputs/Input"

const MessageInputField = () => {
    const { conversationId } = useConversation()
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FieldValues>({ defaultValues: { message: "" } })

    const onSubmitHandler: SubmitHandler<FieldValues> = async (data) => {
        try {
            const response = await axios.post("/api/messages", {
                ...data,
                conversationId,
            })
        } catch (error) {
            handleRequestError(error)
        } finally {
            setValue("message", "", { shouldValidate: true })
        }
    }

    return (
        <section className={clsx("bg-gray-100 shadow-sm", "px-2 py-4 md:px-4", "flex items-center gap-4")}>
            <HiPhoto className='cursor-pointer text-2xl text-gray-800 transition-colors duration-100 hover:text-sky-500' />
            <form onSubmit={handleSubmit(onSubmitHandler)} id='message-form' className='grow'>
                <Input
                    id='message'
                    label='Message'
                    type='text'
                    placeholder='Type a message'
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

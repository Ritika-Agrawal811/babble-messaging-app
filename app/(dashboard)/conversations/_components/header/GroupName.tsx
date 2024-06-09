"use client"

import clsx from "clsx"
import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { handleRequestError } from "@/app/_libs/handleRequestError"
import useConversation from "@/app/_hooks/useConversation"

import type { FieldValues, SubmitHandler } from "react-hook-form"

// components
import { MdModeEdit } from "react-icons/md"
import { IoCheckmarkSharp } from "react-icons/io5"
import Input from "@/app/_components/inputs/Input"
import toast from "react-hot-toast"
import Loader from "@/app/_components/Loader"

interface GroupNameProps {
    title: string
}

const GroupName: React.FC<GroupNameProps> = ({ title }) => {
    const [changeName, setChangeName] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { conversationId } = useConversation()
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: title,
        },
    })

    //  function to send a POST call to the API to change the group's name
    const changeGroupNameHandler: SubmitHandler<FieldValues> = async (data) => {
        if (data.name === title) {
            setChangeName(false)
            return
        }

        try {
            setIsLoading(true)
            const response = await axios.post("/api/settings/update/groupname", {
                ...data,
                conversationId,
            })

            if (response.status !== 200) throw new Error("Failed to change group name")

            toast.success(`Group name is successfully changed to ${data.name}`)
            router.refresh()
        } catch (error) {
            handleRequestError(error)
        } finally {
            setIsLoading(false)
            setChangeName(false)
        }
    }

    return (
        <>
            {changeName ? (
                <form className={clsx("my-4", "flex gap-2")} onSubmit={handleSubmit(changeGroupNameHandler)}>
                    <div className='grow'>
                        <Input
                            label='New Group Name'
                            id='name'
                            autocomplete='off'
                            register={register}
                            errors={errors}
                            showLabel={false}
                        />
                    </div>
                    <button
                        type='submit'
                        disabled={isLoading}
                        className={clsx(
                            "rounded-md p-2 text-2xl",
                            "bg-sky-500 text-white hover:bg-sky-600 focus-visible:bg-sky-600",
                            isLoading && "pointer-events-none cursor-default opacity-50"
                        )}
                    >
                        {isLoading ? <Loader /> : <IoCheckmarkSharp />}
                    </button>
                </form>
            ) : (
                <div className={clsx("flex items-center justify-center gap-4", "mt-2")}>
                    <h2 className='text-center text-2xl text-gray-900'>{title}</h2>
                    <MdModeEdit
                        onClick={() => setChangeName(true)}
                        className={clsx(
                            "cursor-pointer text-2xl",
                            "text-gray-500 transition-colors duration-100 hover:text-sky-500"
                        )}
                    />
                </div>
            )}
        </>
    )
}

export default GroupName

"use client"

import clsx from "clsx"
import axios from "axios"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { handleRequestError } from "@/app/_libs/handleRequestError"

import type { FieldValues, SubmitHandler } from "react-hook-form"
import type { User } from "@prisma/client"

// components
import { HiChevronLeft } from "react-icons/hi2"
import Image from "next/image"
import Input from "@/app/_components/inputs/Input"
import SelectedUserBox from "./select-users-list/SelectedUserBox"
import Button from "@/app/_components/Button"
import toast from "react-hot-toast"
import Loader from "@/app/_components/Loader"

interface CreateGroupFormProps {
    onGoToPrev: () => void
    onClose: () => void
    selectedUsers: User[] | null
}

const CreateGroupForm: React.FC<CreateGroupFormProps> = ({ onGoToPrev, onClose, selectedUsers }) => {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            members: null,
        },
    })

    const createGroupHandler: SubmitHandler<FieldValues> = async (data) => {
        data.members = selectedUsers ? selectedUsers : null

        if (!data.members) return

        try {
            setIsLoading(true)
            const response = await axios.post("/api/conversations", { ...data, isGroup: true })

            if (response.status !== 200) throw new Error("Unable to create a group")

            toast.success("You group is successfully created!")
            router.refresh()
        } catch (error) {
            handleRequestError(error)
        } finally {
            setIsLoading(false)
            reset({
                name: "",
                members: null,
            })
            onClose()
        }
    }

    return (
        <section className='flex h-screen flex-col bg-white'>
            {/* heading */}
            <nav
                className={clsx(
                    "flex items-center justify-between",
                    "py-3 pr-4",
                    "border-b border-gray-100 shadow-sm shadow-zinc-50"
                )}
            >
                <div className='flex items-center gap-2'>
                    <HiChevronLeft className='cursor-pointer text-2xl text-gray-800' onClick={onGoToPrev} />
                    <h3 className='text-lg font-semibold text-neutral-800'>New Group</h3>
                </div>
            </nav>
            <form onSubmit={handleSubmit(createGroupHandler)}>
                <div
                    className={clsx("flex items-center gap-2", "border-b border-gray-100 p-3 shadow-sm shadow-zinc-50")}
                >
                    <figure className='h-12 w-12 shrink-0 rounded-full'>
                        <Image
                            alt=''
                            src='/images/group-placeholder.jpg'
                            width={100}
                            height={100}
                            className='h-full rounded-full object-cover'
                        />
                    </figure>
                    <Input
                        label='Group Name'
                        id='name'
                        autocomplete='off'
                        placeholder='Group name'
                        required
                        showLabel={false}
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                    />
                </div>

                {/* members list */}

                {selectedUsers && (
                    <>
                        <h4 className='p-3 font-medium text-neutral-800'>Members: {selectedUsers.length}</h4>
                        <div
                            className={clsx("flex flex-wrap gap-2", "max-h-[calc(100%-5rem)] overflow-y-auto", "mb-6")}
                        >
                            {selectedUsers.map((item) => {
                                return item && <SelectedUserBox key={item.id} user={item} isClose={false} />
                            })}
                        </div>
                        <div className='flex justify-end pb-3 pr-3'>
                            <Button type='submit' variant='primary' disabled={isLoading}>
                                <span className='flex items-center gap-4'>
                                    {isLoading && <Loader />}
                                    Create Group
                                </span>
                            </Button>
                        </div>
                    </>
                )}
            </form>
        </section>
    )
}

export default CreateGroupForm

"use client"

import clsx from "clsx"
import { useForm } from "react-hook-form"

import type { FieldValues } from "react-hook-form"
import type { User } from "@prisma/client"

// components
import { HiChevronLeft } from "react-icons/hi2"
import Image from "next/image"
import Input from "@/app/_components/inputs/Input"
import SelectedUserBox from "./select-users-list/SelectedUserBox"
import Button from "@/app/_components/Button"

interface CreateGroupFormProps {
    onGoToPrev: () => void
    selectedUsers: User[] | null
}

const CreateGroupForm: React.FC<CreateGroupFormProps> = ({ onGoToPrev, selectedUsers }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>()

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
            <form className={clsx("p-3", "border-b border-gray-100 shadow-sm shadow-zinc-50")}>
                <div className='flex items-center gap-2'>
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
                        id='group_name'
                        autocomplete='off'
                        placeholder='Group name'
                        required
                        showLabel={false}
                        register={register}
                        errors={errors}
                    />
                </div>
            </form>

            {/* members list */}

            {selectedUsers && (
                <>
                    <h4 className='p-3 font-medium text-neutral-800'>Members: {selectedUsers.length}</h4>
                    <div className={clsx("flex flex-wrap gap-4", "max-h-[calc(100%-5rem)] overflow-y-auto", "mb-6")}>
                        {selectedUsers.map((item) => {
                            return item && <SelectedUserBox key={item.id} user={item} isClose={false} />
                        })}
                    </div>
                    <div className='flex justify-end pb-3 pr-3'>
                        <Button type='submit' variant='primary'>
                            Create Group
                        </Button>
                    </div>
                </>
            )}
        </section>
    )
}

export default CreateGroupForm

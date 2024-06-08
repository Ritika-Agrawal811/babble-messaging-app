"use client"

import clsx from "clsx"

import type { User } from "@prisma/client"

// components
import Avatar from "@/app/_components/Avatar"
import { IoCheckmarkCircle } from "react-icons/io5"

interface UserBoxProps {
    user: User
    setSelectedUsers: React.Dispatch<React.SetStateAction<User[] | null>>
    isSelected: boolean
}

const UserBox: React.FC<UserBoxProps> = ({ user, setSelectedUsers, isSelected }) => {
    // add user to selectedUsers list when it is clicked and remove it when clicked again
    const selectUserHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()

        if (!isSelected) {
            setSelectedUsers((prev) => (prev ? [...prev, user] : [user]))
            return
        }

        // remove user when clicked again
        setSelectedUsers((prev) => {
            if (!prev) return prev

            const updatedSelectedUsers = prev.filter((item) => item.id !== user.id)
            return updatedSelectedUsers
        })
    }

    return (
        <article
            onClick={selectUserHandler}
            className={clsx(
                "px-3 py-4",
                "flex gap-3",
                "cursor-pointer transition-colors duration-75 hover:bg-neutral-50"
            )}
        >
            <figure className='relative rounded-full'>
                <Avatar image={user.image} size='default' showStatus={false} />
                {isSelected && (
                    <span className='absolute -bottom-1 -right-1 rounded-full bg-white'>
                        <IoCheckmarkCircle className='text-lg text-sky-500' />
                    </span>
                )}
            </figure>
            <div className='flex flex-1 items-center'>
                <h4 className='font-semibold text-gray-900'>{user.name}</h4>
            </div>
        </article>
    )
}

export default UserBox

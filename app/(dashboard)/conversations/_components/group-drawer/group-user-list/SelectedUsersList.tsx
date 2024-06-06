"use client"

import clsx from "clsx"

import type { User } from "@prisma/client"

// components
import Button from "@/app/_components/Button"
import { GrFormNextLink } from "react-icons/gr"
import { FiAlertTriangle } from "react-icons/fi"
import SelectedUserBox from "./SelectedUserBox"

interface SelectedUsersListProps {
    selectedUsers: User[]
    setSelectedUsers: React.Dispatch<React.SetStateAction<User[] | null>>
}

const SelectedUsersList: React.FC<SelectedUsersListProps> = ({ selectedUsers, setSelectedUsers }) => {
    const unselectUserHandler = (user: User) => {
        setSelectedUsers((prev) => {
            if (!prev) return prev

            const updatedSelectedUsers = prev.filter((item) => item.id !== user.id)
            return updatedSelectedUsers
        })
    }

    return (
        <div className='border-b border-gray-100 shadow-sm shadow-zinc-50'>
            <div className={clsx("flex flex-wrap gap-4", "h-[5.25rem] overflow-y-auto", "mb-6 mt-3 px-4")}>
                {selectedUsers.map((item) => {
                    return (
                        item && <SelectedUserBox key={item.id} user={item} onClick={() => unselectUserHandler(item)} />
                    )
                })}
            </div>

            {selectedUsers.length > 1 ? (
                <div className='mb-3 flex justify-end px-4'>
                    <Button type='button' variant='primary'>
                        <span className='flex gap-1'>
                            Next
                            <GrFormNextLink className='text-2xl' />
                        </span>
                    </Button>{" "}
                </div>
            ) : (
                <p
                    className={clsx(
                        "flex items-center gap-2 md:gap-1 lg:gap-2",
                        "bg-yellow-100 px-2 py-1 text-yellow-900 md:text-sm"
                    )}
                >
                    <FiAlertTriangle className='text-yellow-600' /> At least 2 members must be selected
                </p>
            )}
        </div>
    )
}

export default SelectedUsersList

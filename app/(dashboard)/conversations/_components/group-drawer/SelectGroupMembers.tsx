"use client"

import clsx from "clsx"

import type { User } from "@prisma/client"

// components
import { MdOutlineSearch } from "react-icons/md"
import { HiChevronLeft } from "react-icons/hi2"
import UserBox from "./UserBox"
import SelectedUsersList from "./select-users-list/SelectedUsersList"

interface SelectGroupMembersProps {
    onClose: () => void
    users: User[]
    selectedUsers: User[] | null
    setSelectedUsers: React.Dispatch<React.SetStateAction<User[] | null>>
    onProceedToNext: () => void
}

const SelectGroupMembers: React.FC<SelectGroupMembersProps> = ({
    users,
    selectedUsers,
    setSelectedUsers,
    onClose,
    onProceedToNext,
}) => {
    const closeGroupDrawer = () => {
        setSelectedUsers(null)
        onClose()
    }

    const selectedUsersCount = selectedUsers ? selectedUsers.length : 0

    return (
        <section className='flex h-screen flex-col'>
            {/* heading */}
            <nav
                className={clsx(
                    "flex items-center justify-between",
                    "py-3 pr-4",
                    "border-b border-gray-100 shadow-sm shadow-zinc-50"
                )}
            >
                <div className='flex items-center gap-2'>
                    <HiChevronLeft className='cursor-pointer text-2xl text-gray-800' onClick={closeGroupDrawer} />
                    <div>
                        <h3 className='font-semibold text-neutral-800'>New Group</h3>
                        <p className='-mt-0.5 text-sm text-gray-500'>
                            {selectedUsersCount > 0
                                ? `${selectedUsersCount} user${selectedUsersCount === 1 ? "" : "s"} selected`
                                : "Add members"}
                        </p>
                    </div>
                </div>
                <MdOutlineSearch
                    className={clsx(
                        "cursor-pointer text-2xl",
                        "text-gray-500 transition-colors duration-100 hover:text-sky-500"
                    )}
                />
            </nav>

            {/* selected users section */}
            {selectedUsers && selectedUsers.length > 0 && (
                <SelectedUsersList
                    selectedUsers={selectedUsers}
                    setSelectedUsers={setSelectedUsers}
                    onProceedToNext={onProceedToNext}
                />
            )}

            {/* complete users list */}
            <div className='grow overflow-y-auto'>
                {users.map((user) => (
                    <UserBox
                        key={user.id}
                        user={user}
                        setSelectedUsers={setSelectedUsers}
                        isSelected={selectedUsers ? !!selectedUsers.find((item) => item.id === user.id) : false}
                    />
                ))}
            </div>
        </section>
    )
}

export default SelectGroupMembers

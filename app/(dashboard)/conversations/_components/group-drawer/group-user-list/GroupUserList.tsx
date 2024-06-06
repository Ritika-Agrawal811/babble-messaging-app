"use client"

import { useState } from "react"

import type { User } from "@prisma/client"

// components
import UserBox from "./UserBox"
import SelectedUsersList from "./SelectedUsersList"

interface GroupUserListProps {
    users: User[]
}

const GroupUserList: React.FC<GroupUserListProps> = ({ users }) => {
    const [selectedUsers, setSelectedUsers] = useState<User[] | null>(null)

    return (
        <>
            {selectedUsers && selectedUsers.length > 0 && (
                <SelectedUsersList selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
            )}
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
        </>
    )
}

export default GroupUserList

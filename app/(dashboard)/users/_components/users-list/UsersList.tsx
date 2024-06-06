"use client"

import clsx from "clsx"
import type { User } from "@prisma/client"

// components
import UserBox from "./UserBox"

interface UsersListProps {
    users: User[]
}

const UsersList: React.FC<UsersListProps> = ({ users }) => {
    return (
        <section
            className={clsx(
                "flex h-screen flex-col",
                "col-span-full md:col-span-2 lg:col-span-1",
                "border-r-2 border-gray-100"
            )}
        >
            <h3
                className={clsx(
                    "px-4 py-3",
                    "text-xl font-semibold text-neutral-800",
                    "border-b border-gray-100 shadow-sm shadow-zinc-50"
                )}
            >
                People
            </h3>
            <div className={clsx("flex flex-col", "grow overflow-y-auto")}>
                {users.map((user) => (
                    <UserBox key={user.id} user={user} />
                ))}
            </div>
        </section>
    )
}

export default UsersList

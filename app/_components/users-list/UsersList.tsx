"use client"

import clsx from "clsx"
import { User } from "@prisma/client"

// components
import UserBox from "./UserBox"

interface UsersListProps {
    users: User[]
}

const UsersList: React.FC<UsersListProps> = ({ users }) => {
    return (
        <section className={clsx("grow", "border-r-2 border-gray-100")}>
            <h3
                className={clsx(
                    "px-4 py-2.5",
                    "text-xl font-semibold text-neutral-800",
                    "border-b border-gray-100 shadow-sm shadow-zinc-50"
                )}
            >
                People
            </h3>
            <div className='flex flex-col'>
                {users.map((user) => (
                    <UserBox key={user.id} user={user} />
                ))}
            </div>
        </section>
    )
}

export default UsersList

"use client"

import clsx from "clsx"
import { User } from "@prisma/client"

interface UsersListProps {
    users: User[]
}

const UsersList: React.FC<UsersListProps> = ({ users }) => {
    return <div className={clsx("grow", "border-2 border-red-500")}>UsersList</div>
}

export default UsersList

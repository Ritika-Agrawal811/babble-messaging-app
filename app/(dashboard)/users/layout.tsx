import clsx from "clsx"
import getUsers from "@/app/_libs/getUsers"

// components
import UsersList from "./_components/users-list/UsersList"

export default async function UsersLayout({ children }: { children: React.ReactNode }) {
    const users = await getUsers()
    return (
        <div className={clsx("grow", "grid grid-cols-5")}>
            <UsersList users={users} />
            {children}
        </div>
    )
}

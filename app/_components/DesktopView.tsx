import clsx from "clsx"
import getUsers from "@/app/_libs/getUsers"
import getCurrentUser from "@/app/_libs/getCurrentUser"

// components
import DesktopSidebar from "@/app/_components/desktop-sidebar/DesktopSidebar"
import UsersList from "@/app/_components/users-list/UsersList"

export default async function DesktopView({ children }: { children: React.ReactNode }) {
    const currentUser = await getCurrentUser()
    const users = await getUsers()

    return (
        <div className={clsx("h-screen", "grid grid-cols-5 lg:grid-cols-4")}>
            <aside className={clsx("h-screen", "hidden md:flex", "col-span-2 lg:col-span-1")}>
                <DesktopSidebar currentUser={currentUser!} />
                <UsersList users={users} />
            </aside>
            {children}
        </div>
    )
}

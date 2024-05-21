import clsx from "clsx"
import getUsers from "@/app/_libs/getUsers"
import getCurrentUser from "@/app/_libs/getCurrentUser"

// components
import DesktopSidebar from "@/app/_components/desktop-sidebar/DesktopSidebar"
import UsersList from "@/app/(dashboard)/users/_components/users-list/UsersList"

export default async function DesktopView({ children }: { children: React.ReactNode }) {
    const currentUser = await getCurrentUser()
    const users = await getUsers()

    return (
        <div className={clsx("h-screen", "flex")}>
            <DesktopSidebar currentUser={currentUser!} />

            {children}
        </div>
    )
}

import clsx from "clsx"
import getCurrentUser from "@/app/_libs/getCurrentUser"

// components
import Sidebar from "@/app/_components/sidebar/Sidebar"
import MobileFooter from "@/app/_components/mobile-footer/MobileFooter"

export default async function UsersLayout({ children }: { children: React.ReactNode }) {
    const currentUser = await getCurrentUser()
    return (
        <div className={clsx("h-full", "grid grid-cols-5 lg:grid-cols-4")}>
            <Sidebar currentUser={currentUser!} />
            {children}
            <MobileFooter />
        </div>
    )
}

import clsx from "clsx"
import getCurrentUser from "@/app/_libs/getCurrentUser"

// components
import DesktopSidebar from "@/app/_components/desktop-sidebar/DesktopSidebar"

export default async function DesktopView({ children }: { children: React.ReactNode }) {
    const currentUser = await getCurrentUser()

    return (
        <div className={clsx("h-screen", "flex")}>
            <DesktopSidebar currentUser={currentUser!} />
            {children}
        </div>
    )
}

import clsx from "clsx"

// components
import Sidebar from "@/app/_components/sidebar/Sidebar"
import MobileFooter from "../_components/mobile-footer/MobileFooter"

export default async function UsersLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={clsx("h-full", "grid grid-cols-5 lg:grid-cols-4")}>
            <Sidebar />
            {children}
            <MobileFooter />
        </div>
    )
}

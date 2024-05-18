import clsx from "clsx"

// components
import Sidebar from "@/app/_components/sidebar/Sidebar"

export default async function UsersLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={clsx("h-full", "grid grid-cols-4")}>
            <Sidebar />
            {children}
        </div>
    )
}

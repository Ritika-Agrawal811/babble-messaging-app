"use client"

import clsx from "clsx"
import { useState } from "react"
import { User } from "@prisma/client"
import useRoutes from "@/app/_hooks/useRoutes"

// components
import SidebarItem from "./SidebarItem"
import Avatar from "@/app/_components/Avatar"

interface SidebarProps {
    currentUser: User
}

const Sidebar: React.FC<SidebarProps> = ({ currentUser }) => {
    const routes = useRoutes()
    const [isOpen, setIsOpen] = useState(false)

    console.log({ currentUser })

    return (
        <aside className={clsx("h-full", "hidden md:block", "col-span-2 lg:col-span-1")}>
            <nav className={clsx("flex flex-col justify-between", "h-full w-fit border-r-2 border-gray-100")}>
                <ul className={clsx("space-y-2")}>
                    {routes.map((item) => {
                        return <SidebarItem key={item.label} {...item} />
                    })}
                </ul>
                <div onClick={() => setIsOpen(true)}>
                    <Avatar user={currentUser} />
                </div>
            </nav>
        </aside>
    )
}

export default Sidebar

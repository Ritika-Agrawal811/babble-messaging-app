"use client"

import clsx from "clsx"
import { useState } from "react"
import useRoutes from "@/app/_hooks/useRoutes"

import type { User } from "@prisma/client"

// components
import DesktopSidebarItem from "./DesktopSidebarItem"
import Avatar from "@/app/_components/Avatar"

interface DesktopSidebarProps {
    currentUser: User
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ currentUser }) => {
    const routes = useRoutes()
    const [isOpen, setIsOpen] = useState(false)

    return (
        <aside className={clsx("hidden flex-col justify-between md:flex", "h-full w-fit border-r-2 border-gray-100")}>
            <ul className={clsx("space-y-2")}>
                {routes.map((item) => {
                    return <DesktopSidebarItem key={item.label} {...item} />
                })}
            </ul>
            <div onClick={() => setIsOpen(true)} className='my-4'>
                <Avatar image={currentUser.image} size='small' />
            </div>
        </aside>
    )
}

export default DesktopSidebar

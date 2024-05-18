"use client"

import clsx from "clsx"
import { useState } from "react"
import useRoutes from "@/app/_hooks/useRoutes"
import SidebarItem from "./SidebarItem"

const Sidebar = () => {
    const routes = useRoutes()
    const [isOpen, setIsOpen] = useState(false)

    return (
        <aside className={clsx("h-full", "hidden lg:block")}>
            <nav className={clsx("flex flex-col justify-between", "h-full w-fit border-r-2 border-gray-100")}>
                <ul className={clsx("space-y-2")}>
                    {routes.map((item) => {
                        return <SidebarItem key={item.label} {...item} />
                    })}
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar

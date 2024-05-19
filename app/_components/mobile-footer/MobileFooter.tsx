"use client"

import clsx from "clsx"
import useRoutes from "@/app/_hooks/useRoutes"
import useConversation from "@/app/_hooks/useConversation"

// components
import MobileFooterItem from "./MobileFooterItem"

const MobileFooter = () => {
    const routes = useRoutes()
    const { isOpen } = useConversation()

    if (isOpen) {
        return null
    }

    return (
        <footer className={clsx("md:hidden", "fixed bottom-0", "w-full border-t-2 border-gray-100")}>
            <ul className={clsx("flex")}>
                {routes.map((item) => {
                    return <MobileFooterItem key={item.label} {...item} />
                })}
            </ul>
        </footer>
    )
}

export default MobileFooter

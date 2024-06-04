import { usePathname } from "next/navigation"
import { useMemo } from "react"
import { signOut } from "next-auth/react"
import useConversation from "./useConversation"

// components
import { HiChat } from "react-icons/hi"
import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2"
import { IoSettingsSharp } from "react-icons/io5"

const useRoutes = () => {
    const pathname = usePathname()
    const { conversationId } = useConversation()

    const routes = useMemo(
        () => [
            {
                label: "Chat",
                href: "/conversations",
                icon: HiChat,
                active: pathname === "/conversations" || !!conversationId,
            },
            {
                label: "Users",
                href: "/users",
                icon: HiUsers,
                active: pathname === "/users",
            },
            {
                label: "Logout",
                href: "#",
                icon: HiArrowLeftOnRectangle,
                onClick: () => signOut(),
            },
            {
                label: "Settings",
                href: "/settings",
                icon: IoSettingsSharp,
                active: pathname === "/settings",
            },
        ],
        [pathname, conversationId]
    )

    return routes
}

export default useRoutes

// a hook to manage sidebar routes

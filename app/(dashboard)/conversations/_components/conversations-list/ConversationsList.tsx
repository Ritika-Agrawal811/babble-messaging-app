"use client"

import clsx from "clsx"
import { find } from "lodash"
import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import useConversation from "@/app/_hooks/useConversation"
import { pusherClient } from "@/app/_libs/pusher"

import type { FullConversation } from "@/app/_types"
import type { User } from "@prisma/client"

// components
import { MdOutlineGroupAdd } from "react-icons/md"
import ConversationBox from "./ConversationBox"
import CreateGroupDrawer from "../group-drawer/CreateGroupDrawer"

interface ConversationsListProps {
    list: FullConversation[]
    users: User[]
}

const ConversationsList: React.FC<ConversationsListProps> = ({ list, users }) => {
    const [items, setItems] = useState(list)
    const [createGroup, setCreatGroup] = useState(false)

    const { conversationId, isOpen } = useConversation()
    const router = useRouter()
    const { data: session } = useSession()

    const userEmail = session?.user?.email

    const newConversationHandler = useCallback((conversation: FullConversation) => {
        setItems((current) => {
            // find if the new message already doesn't exist
            if (find(current, { id: conversation.id })) return current

            return [conversation, ...current]
        })
    }, [])

    useEffect(() => {
        if (!userEmail) return

        pusherClient.subscribe(userEmail)
        pusherClient.bind("conversation:new", newConversationHandler)

        return () => {
            pusherClient.unsubscribe(userEmail)
            pusherClient.unbind("conversation:new", newConversationHandler)
        }
    }, [userEmail, newConversationHandler])

    return (
        <section
            className={clsx(
                "relative h-screen flex-col overflow-hidden",
                "col-span-full md:col-span-2 xl:col-span-1",
                "border-r-2 border-gray-100",
                isOpen ? "hidden md:flex" : "flex"
            )}
        >
            <nav
                className={clsx(
                    "flex items-center justify-between",
                    "px-4 py-3",
                    "border-b border-gray-100 shadow-sm shadow-zinc-50"
                )}
            >
                <h3 className='text-xl font-semibold text-neutral-800'>Messages</h3>
                <MdOutlineGroupAdd
                    className={clsx(
                        "cursor-pointer text-2xl",
                        "text-gray-500 transition-colors duration-100 hover:text-sky-500"
                    )}
                    onClick={() => setCreatGroup(true)}
                />
            </nav>
            <div className={clsx("flex flex-col", "grow overflow-y-auto")}>
                {items.map((conversation) => (
                    <ConversationBox
                        key={conversation.id}
                        conversation={conversation}
                        selected={conversationId === conversation.id}
                    />
                ))}
            </div>

            <CreateGroupDrawer isOpen={createGroup} onClose={() => setCreatGroup(false)} users={users} />
        </section>
    )
}

export default ConversationsList

"use client"

import clsx from "clsx"
import { useState } from "react"
import { useRouter } from "next/navigation"
import useConversation from "@/app/_hooks/useConversation"

import type { FullConversation } from "@/app/_types"

// components
import { MdOutlineGroupAdd } from "react-icons/md"
import ConversationBox from "./ConversationBox"

interface ConversationsListProps {
    list: FullConversation[]
}

const ConversationsList: React.FC<ConversationsListProps> = ({ list }) => {
    const [items, setItems] = useState(list)
    const router = useRouter()
    const { conversationId, isOpen } = useConversation()
    return (
        <section
            className={clsx(
                "h-screen grow",
                "col-span-full md:col-span-2 xl:col-span-1",
                "flex flex-col",
                "border-r-2 border-gray-100",
                isOpen ? "hidden md:block" : "block"
            )}
        >
            <h3
                className={clsx(
                    "flex items-center justify-between",
                    "px-4 py-3",
                    "text-xl font-semibold text-neutral-800",
                    "border-b border-gray-100 shadow-sm shadow-zinc-50"
                )}
            >
                Messages
                <MdOutlineGroupAdd
                    className={clsx(
                        "cursor-pointer text-2xl",
                        "text-gray-500 transition-colors duration-100 hover:text-sky-500"
                    )}
                />
            </h3>
            <div className={clsx("flex flex-col", "max-h-[calc(100vh-3.5em)] grow overflow-y-auto")}>
                {list.map((conversation) => (
                    <ConversationBox
                        key={conversation.id}
                        conversation={conversation}
                        selected={conversationId === conversation.id}
                    />
                ))}
            </div>
        </section>
    )
}

export default ConversationsList

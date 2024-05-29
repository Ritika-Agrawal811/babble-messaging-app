"use client"

import clsx from "clsx"
import { useRef, useState } from "react"
import useConversation from "@/app/_hooks/useConversation"

import type { FullMessage } from "@/app/_types"

// components
import MessageBox from "./MessageBox"

interface BodyProps {
    initialMessages: FullMessage[]
}

const Body: React.FC<BodyProps> = ({ initialMessages }) => {
    const [messages, setMessages] = useState(initialMessages)
    const { conversationId } = useConversation()
    const bottomRef = useRef<HTMLDivElement>(null)

    return (
        <section className={clsx("grow overflow-y-auto")}>
            <div className='flex flex-col px-2'>
                {messages.map((message, index) => (
                    <MessageBox key={message.id} message={message} />
                ))}
            </div>
            <div ref={bottomRef} className='pt-6'></div>
        </section>
    )
}

export default Body

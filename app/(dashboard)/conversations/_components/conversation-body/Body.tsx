"use client"

import clsx from "clsx"
import axios from "axios"
import { useRef, useState, useEffect } from "react"
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

    useEffect(() => {
        try {
            // adding user to "seen" array whenever they open the conversation window
            axios.post(`/api/conversations/${conversationId}/seen`)
        } catch (error) {
            console.log("Failed to set message status to seen", error)
        }
    }, [conversationId])

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

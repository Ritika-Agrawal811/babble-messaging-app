"use client"

import clsx from "clsx"
import axios from "axios"
import { find } from "lodash"
import { useRef, useState, useEffect, useCallback } from "react"
import useConversation from "@/app/_hooks/useConversation"
import { pusherClient } from "@/app/_libs/pusher"

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

    const seenStatusHandler = useCallback(async () => {
        try {
            // adding user to "seen" array whenever they open the conversation window
            axios.post(`/api/conversations/${conversationId}/seen`)
        } catch (error) {
            console.log("Failed to set message status to seen", error)
        }
    }, [conversationId])

    const newMessageHandler = useCallback((message: FullMessage) => {
        setMessages((current) => {
            // find if the new message already doesn't exist
            if (find(current, { id: message.id })) return current

            return [...current, message]
        })
    }, [])

    const updateSeenStatusHandler = useCallback((newMessage: FullMessage) => {
        setMessages((current) =>
            current.map((message) => {
                if (message.id === newMessage.id) return newMessage

                return message
            })
        )
    }, [])

    useEffect(() => {
        // conversationId is used as the channel name for each conversation
        pusherClient.subscribe(conversationId)
        pusherClient.bind("messages:new", newMessageHandler)
        pusherClient.bind("message:update", updateSeenStatusHandler)

        bottomRef?.current?.scrollIntoView() // scroll to the bottom of component
        seenStatusHandler()

        return () => {
            pusherClient.unsubscribe(conversationId)
            pusherClient.unbind("messages:new", newMessageHandler)
            pusherClient.bind("message:update", updateSeenStatusHandler)
        }
    }, [conversationId, newMessageHandler, seenStatusHandler, updateSeenStatusHandler])

    useEffect(() => {
        // Scroll to the bottom whenever the new message is added
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
        seenStatusHandler()
    }, [messages, seenStatusHandler])

    return (
        <section className={clsx("grow overflow-y-auto")}>
            <div className='flex flex-col scroll-smooth px-2'>
                {messages.map((message) => (
                    <MessageBox key={message.id} message={message} />
                ))}
            </div>
            <div ref={bottomRef} className='pt-6'></div>
        </section>
    )
}

export default Body

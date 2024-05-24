"use client"

import clsx from "clsx"
import { format } from "date-fns"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import useRecipient from "@/app/_hooks/useRecipient"

import type { FullConversation } from "@/app/_types"

// components
import Avatar from "@/app/_components/Avatar"

interface ConversationBoxProps {
    conversation: FullConversation
    selected: boolean
}

const ConversationBox: React.FC<ConversationBoxProps> = ({ conversation, selected }) => {
    const recipient = useRecipient(conversation)
    const { data: session } = useSession()
    const router = useRouter()

    const currentUserEmail = session?.user?.email

    // get last message for a conversation
    const messages = conversation.messages || []
    const lastMessage = messages[messages.length - 1] || ""
    const lastMessageContent = lastMessage.image
        ? "Sent an Image"
        : lastMessage.body || "Send first message lorem ipsum hjg hji jjj jk gfdr"

    // check if the user has already seen the message
    const seenArray = lastMessage.seen || []
    const hasSeen = seenArray.filter((user) => user.email === currentUserEmail).length !== 0

    const openConversationWindow = () => {
        router.push(`/conversations/${conversation.id}`)
    }

    return (
        <article
            onClick={openConversationWindow}
            className={clsx(
                "px-3 py-4",
                "flex gap-3",
                "cursor-pointer transition-colors duration-75 hover:bg-neutral-50"
            )}
        >
            <Avatar image={recipient.image} size='big' />
            <div className='flex-1 md:max-w-[calc(100%-3em)]'>
                <div className='flex items-center justify-between'>
                    <h4 className='font-semibold text-gray-900'>{conversation.name || recipient.name}</h4>
                    {lastMessage?.createdAt && (
                        <time className='text-xs text-gray-500' dateTime=''>
                            {format(new Date(lastMessage.createdAt), "p")}
                        </time>
                    )}
                </div>
                <p className={clsx("text-xs text-gray-500 ", "w-full truncate")}>{lastMessageContent}</p>
            </div>
        </article>
    )
}

export default ConversationBox

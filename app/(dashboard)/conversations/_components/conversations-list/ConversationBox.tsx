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

    const currentUserEmail = session?.user?.email || ""

    // get last message for a conversation
    const messages = conversation.messages || []
    const lastMessage = messages[messages.length - 1] || ""
    const lastMessageContent = lastMessage.image ? "Sent an Image" : lastMessage.body

    // check if the user has already seen the message
    const seenArray = lastMessage.seen || []
    const hasSeen = seenArray.filter((user) => user.email === currentUserEmail).length !== 0

    // calculate new messages count
    const newMessagesCount = messages.reduce((count, message) => {
        const hasSeen = message.seen.some((user) => user.email === currentUserEmail)
        return hasSeen ? count : count + 1
    }, 0)

    const openConversationWindow = () => {
        router.push(`/conversations/${conversation.id}`)
    }

    return (
        <article
            onClick={openConversationWindow}
            className={clsx(
                "px-3 py-4",
                "flex gap-3",
                "cursor-pointer transition-colors duration-75 hover:bg-neutral-50",
                selected && "bg-neutral-50"
            )}
        >
            <Avatar image={recipient.image} size='big' />
            <div className='flex-1 md:max-w-[calc(100%-3em)]'>
                <header className='flex items-center justify-between'>
                    <h4 className='font-semibold text-gray-900'>{conversation.name || recipient.name}</h4>
                    {lastMessage?.createdAt && (
                        <time
                            className={clsx("text-xs", hasSeen ? "text-gray-500" : "font-bold text-sky-500")}
                            dateTime=''
                        >
                            {format(new Date(lastMessage.createdAt), "p")}
                        </time>
                    )}
                </header>
                <div className='flex items-center justify-end'>
                    <p className='w-full truncate text-xs'>
                        {lastMessageContent ? (
                            <span className={hasSeen ? "text-gray-500" : "font-bold text-gray-900"}>
                                {lastMessageContent}
                            </span>
                        ) : (
                            <span className='text-gray-500'>Send first message</span>
                        )}
                    </p>
                    {newMessagesCount !== 0 && (
                        <span
                            className={clsx(
                                "h-5 w-5",
                                "flex shrink-0 items-center justify-center",
                                "rounded-full bg-sky-500 text-xs font-medium text-white"
                            )}
                        >
                            {newMessagesCount}
                        </span>
                    )}
                </div>
            </div>
        </article>
    )
}

export default ConversationBox

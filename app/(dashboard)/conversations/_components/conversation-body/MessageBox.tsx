"use client"

import clsx from "clsx"
import { format } from "date-fns"
import { useSession } from "next-auth/react"

import type { FullMessage } from "@/app/_types"

// components
import Image from "next/image"
import { LuCheck, LuCheckCheck } from "react-icons/lu"

interface MessageBoxProps {
    message: FullMessage
    isLast: boolean
}

const MessageBox: React.FC<MessageBoxProps> = ({ message, isLast }) => {
    const { data: session } = useSession()

    const isOwn = session?.user?.email === message?.sender?.email
    const hasSeen = (message.seen || []).filter((user) => user.email !== message?.sender?.email).length !== 0

    // use in group chat
    // create a comma separated list of users who have seen the message
    // const seenList = (message.seen || [])
    //     .filter((user) => user.email == message?.sender?.email)
    //     .map((user) => user.name)
    //     .join(", ")

    return (
        <div
            className={clsx(
                "mt-4 w-fit rounded-2xl px-3 py-2",
                isOwn ? "self-end rounded-tr-none bg-sky-500 text-white" : "rounded-tl-none bg-gray-50"
            )}
        >
            {message.body && <p className='min-w-20 max-w-[80vw] md:max-w-[35vw]'>{message.body}</p>}

            {message.image && (
                <figure className='overflow-hidden rounded-xl'>
                    <Image
                        alt='user sent an image'
                        src={message.image}
                        width={300}
                        height={300}
                        className={clsx(
                            "cursor-pointer rounded-xl object-cover",
                            "transition duration-150 hover:scale-105"
                        )}
                    />
                </figure>
            )}

            <div className={clsx("mt-1 flex items-center justify-end gap-1", isOwn ? "text-white" : "text-gray-500")}>
                <time className='text-xs' dateTime=''>
                    {format(new Date(message.createdAt), "p")}
                </time>
                {isOwn &&
                    (hasSeen ? (
                        <span className='ml-1 flex items-center gap-1 text-xs'>
                            <LuCheckCheck className='text-base' /> Seen
                        </span>
                    ) : (
                        <span className='ml-1'>
                            <LuCheck />
                        </span>
                    ))}
            </div>
        </div>
    )
}

export default MessageBox

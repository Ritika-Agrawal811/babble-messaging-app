"use client"

import clsx from "clsx"
import { format } from "date-fns"
import { useSession } from "next-auth/react"

import type { FullMessage } from "@/app/_types"

// components
import Image from "next/image"

interface MessageBoxProps {
    message: FullMessage
}

const MessageBox: React.FC<MessageBoxProps> = ({ message }) => {
    const { data: session } = useSession()

    const isOwn = session?.user?.email === message?.sender?.email
    // create a comma separated list of users who have seen the message
    const seenList = (message.seen || [])
        .filter((user) => user.email !== message?.sender?.email)
        .map((user) => user.name)
        .join(", ")

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

            <time
                className={clsx("mt-1 flex w-full justify-end text-xs", isOwn ? "text-white" : "text-gray-500")}
                dateTime=''
            >
                {format(new Date(message.createdAt), "p")}
            </time>
        </div>
    )
}

export default MessageBox

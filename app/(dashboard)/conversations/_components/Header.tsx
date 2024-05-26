"use client"

import clsx from "clsx"
import useRecipient from "@/app/_hooks/useRecipient"

import type { Conversation, User } from "@prisma/client"

// components
import { HiChevronLeft, HiEllipsisVertical } from "react-icons/hi2"
import Avatar from "@/app/_components/Avatar"
import Link from "next/link"

interface HeaderProps {
    conversation: Conversation & {
        users: User[]
    }
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
    const recipient = useRecipient(conversation)

    const statusText = conversation.isGroup ? `${conversation.users.length} memebers` : "Online"

    return (
        <header className={clsx("bg-gray-100 shadow-sm", "px-2 py-2.5 md:px-4")}>
            <nav className='flex items-center'>
                <Link href='/conversations' className='mr-1 md:hidden'>
                    <HiChevronLeft className='cursor-pointer text-2xl text-gray-800' />
                </Link>

                <div className='flex items-center gap-2'>
                    <Avatar image={recipient.image} size='big' showStatus={false} />
                    <div>
                        <h4 className='font-semibold text-gray-900'>{conversation.name || recipient.name}</h4>

                        <p className='text-xs text-gray-500'>{statusText}</p>
                    </div>
                </div>

                <HiEllipsisVertical
                    className={clsx(
                        "text-2xl text-gray-800 transition-colors duration-100 hover:text-sky-500",
                        "ml-auto cursor-pointer"
                    )}
                />
            </nav>
        </header>
    )
}

export default Header

"use client"

import type { Conversation, User } from "@prisma/client"

// components
import Avatar from "@/app/_components/Avatar"
import GroupName from "./group/GroupName"

interface ProfileDrawerHeaderProps {
    recipient: User
    conversation: Conversation & {
        users: User[]
    }
}

const ProfileDrawerHeader: React.FC<ProfileDrawerHeaderProps> = ({ recipient, conversation }) => {
    const title = conversation.name || recipient.name
    const statusText = conversation.isGroup ? `Group • ${conversation.users.length} members` : "Online"

    return (
        <>
            <section>
                <Avatar image={recipient.image} size='large' showStatus={false} isGroup={!!conversation?.isGroup} />
                {title && !!conversation?.isGroup ? (
                    <GroupName title={title} />
                ) : (
                    <h2 className='mt-2 text-center text-2xl text-gray-900'>{title}</h2>
                )}
                <p className='mt-1 text-center text-gray-500'>{statusText}</p>
            </section>

            <hr className='mt-4 border-b border-gray-100' />
        </>
    )
}

export default ProfileDrawerHeader

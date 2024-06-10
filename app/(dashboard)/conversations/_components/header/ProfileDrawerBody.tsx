"use client"

import type { Conversation, User } from "@prisma/client"

// components
import MembersList from "./group/MembersList"
import RecipientDetails from "./individual/RecipientDetails"

interface ProfileDrawerBodyProps {
    recipient: User
    conversation: Conversation & {
        users: User[]
    }
    onClick: () => void
}

const ProfileDrawerBody: React.FC<ProfileDrawerBodyProps> = ({ recipient, conversation, onClick }) => {
    return (
        <>
            {!!conversation.isGroup ? (
                <MembersList members={conversation.users} onClick={onClick} />
            ) : (
                <>
                    <RecipientDetails recipient={recipient} />
                </>
            )}

            <hr className='mt-4 border-b border-gray-100' />
        </>
    )
}

export default ProfileDrawerBody

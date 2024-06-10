"use client"
import useRecipient from "@/app/_hooks/useRecipient"

import type { Conversation, User } from "@prisma/client"
import type { FullConversation } from "@/app/_types"

// components
import MembersList from "./group/MembersList"
import RecipientDetails from "./individual/RecipientDetails"
import CommonGroups from "./individual/CommonGroups"

interface ProfileDrawerBodyProps {
    allUserConversations: FullConversation[]
    conversation: Conversation & {
        users: User[]
    }
    onClick: () => void
}

const ProfileDrawerBody: React.FC<ProfileDrawerBodyProps> = ({ allUserConversations, conversation, onClick }) => {
    const recipient = useRecipient(conversation)

    // find the common groups between recipient and user
    const commonGroups = allUserConversations.filter((item) => item.isGroup && item.userIds.includes(recipient.id))

    return (
        <>
            {!!conversation.isGroup ? (
                <MembersList members={conversation.users} onClick={onClick} />
            ) : (
                <>
                    <RecipientDetails recipient={recipient} />
                    <CommonGroups groups={commonGroups} />
                </>
            )}
        </>
    )
}

export default ProfileDrawerBody

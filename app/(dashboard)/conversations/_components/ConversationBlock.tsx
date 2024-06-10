import clsx from "clsx"

import type { Conversation, User } from "@prisma/client"
import type { FullMessage } from "@/app/_types"

// components
import Header from "./header/Header"
import Body from "./conversation-body/Body"
import MessageInputField from "./MessageInputField"
import getUsers from "@/app/_actions/getUsers"
import getConverstions from "@/app/_actions/getConversations"

interface ConversationBlockProps {
    conversation: Conversation & {
        users: User[]
    }
    messages: FullMessage[]
}

const ConversationBlock: React.FC<ConversationBlockProps> = async ({ conversation, messages }) => {
    const users = await getUsers()
    const allUserConversations = await getConverstions()
    return (
        <main className={clsx("col-span-full md:col-span-3 xl:col-span-4", "h-screen", "flex flex-col")}>
            <Header conversation={conversation} users={users} allUserConversations={allUserConversations} />
            <Body initialMessages={messages} />
            <MessageInputField />
        </main>
    )
}

export default ConversationBlock

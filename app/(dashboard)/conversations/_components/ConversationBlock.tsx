import clsx from "clsx"

import type { Conversation, User } from "@prisma/client"

// components
import Header from "./Header"
import Body from "./Body"
import MessageInputField from "./MessageInputField"

interface ConversationBlockProps {
    conversation: Conversation & {
        users: User[]
    }
}

const ConversationBlock: React.FC<ConversationBlockProps> = ({ conversation }) => {
    return (
        <main className={clsx("col-span-full md:col-span-3 lg:col-span-4", "h-screen", "flex flex-col")}>
            <Header conversation={conversation} />
            <Body />
            <MessageInputField />
        </main>
    )
}

export default ConversationBlock

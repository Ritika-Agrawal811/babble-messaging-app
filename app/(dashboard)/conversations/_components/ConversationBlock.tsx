import clsx from "clsx"

import type { Conversation, User, Message } from "@prisma/client"

// components
import Header from "./Header"
import Body from "./conversation-body/Body"
import MessageInputField from "./MessageInputField"

import type { FullMessage } from "@/app/_types"
interface ConversationBlockProps {
    conversation: Conversation & {
        users: User[]
    }
    messages: FullMessage[]
}

const ConversationBlock: React.FC<ConversationBlockProps> = ({ conversation, messages }) => {
    return (
        <main className={clsx("col-span-full md:col-span-3 xl:col-span-4", "h-screen", "flex flex-col")}>
            <Header conversation={conversation} />
            <Body initialMessages={messages} />
            <MessageInputField />
        </main>
    )
}

export default ConversationBlock

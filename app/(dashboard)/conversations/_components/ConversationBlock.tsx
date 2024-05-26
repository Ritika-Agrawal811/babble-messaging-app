import clsx from "clsx"

import type { Conversation, User } from "@prisma/client"

// components
import Header from "./Header"

interface ConversationBlockProps {
    conversation: Conversation & {
        users: User[]
    }
}

const ConversationBlock: React.FC<ConversationBlockProps> = ({ conversation }) => {
    return (
        <main className={clsx("col-span-full md:col-span-3 lg:col-span-4", "h-full bg-gray-50")}>
            {" "}
            <Header conversation={conversation} />
        </main>
    )
}

export default ConversationBlock

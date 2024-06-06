import clsx from "clsx"
import getConverstions from "@/app/_actions/getConversations"
import getUsers from "@/app/_actions/getUsers"

// components
import ConversationsList from "./_components/conversations-list/ConversationsList"

export default async function ConversationsLayout({ children }: { children: React.ReactNode }) {
    const conversations = await getConverstions()
    const users = await getUsers()
    return (
        <div className={clsx("grow", "grid grid-cols-5")}>
            <ConversationsList list={conversations} users={users} />
            {children}
        </div>
    )
}

import clsx from "clsx"
import getConversationById from "@/app/_actions/getConversationById"
import getMessages from "@/app/_actions/getMessages"

// components
import EmptyState from "@/app/_components/EmptyState"
import ConversationBlock from "../_components/ConversationBlock"

interface IParams {
    conversationId: string
}

const ConversationId = async ({ params }: { params: IParams }) => {
    const { conversationId } = params
    const conversation = await getConversationById(conversationId)
    const messages = await getMessages(conversationId)
    return (
        <>
            {conversation ? (
                <ConversationBlock conversation={conversation} messages={messages} />
            ) : (
                <main className={clsx("hidden md:block", "col-span-3 h-full xl:col-span-4")}>
                    <EmptyState content='Select a chat to continue with the conversation' />
                </main>
            )}
        </>
    )
}

export default ConversationId

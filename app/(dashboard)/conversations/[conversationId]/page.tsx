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
                <ConversationBlock conversation={conversation} />
            ) : (
                <main className={clsx("hidden md:block", "col-span-3 h-full lg:col-span-4")}>
                    {" "}
                    <EmptyState />
                </main>
            )}
        </>
    )
}

export default ConversationId

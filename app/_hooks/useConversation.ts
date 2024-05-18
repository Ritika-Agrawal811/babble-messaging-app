import { useParams } from "next/navigation"
import { useMemo } from "react"

const useConversation = () => {
    const params = useParams()

    const conversationId = (params?.conversationId as string) ?? ""

    //  isOpen stores the boolean version of "conversationId"
    const isOpen = !!conversationId

    return useMemo(
        () => ({
            isOpen,
            conversationId,
        }),
        [isOpen, conversationId]
    )
}

export default useConversation

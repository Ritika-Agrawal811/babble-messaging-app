import prisma from "@/app/_libs/prismadb"
import getCurrentUser from "./getCurrentUser"

// a function to fetch a conversation details by its id
export default async function getConversationById(conversationId: string) {
    try {
        const currentUser = await getCurrentUser()

        if (!currentUser || !currentUser.email) return null

        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId,
            },
            include: {
                users: true,
            },
        })

        return conversation
    } catch (error) {
        return null
    }
}

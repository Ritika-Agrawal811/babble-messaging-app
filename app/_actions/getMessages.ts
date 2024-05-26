import prisma from "@/app/_libs/prismadb"
import getCurrentUser from "./getCurrentUser"

// a fucntion to fetch all messages for a conversation
export default async function getMessages(conversationId: string) {
    try {
        const currentUser = await getCurrentUser()

        if (!currentUser || currentUser.email) return []

        const messages = await prisma.message.findMany({
            where: {
                conversationId,
            },
            include: {
                sender: true,
                seen: true,
            },
            orderBy: {
                createdAt: "asc",
            },
        })

        return messages
    } catch (error) {
        return []
    }
}

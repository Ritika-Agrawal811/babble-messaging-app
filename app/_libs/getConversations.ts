import prisma from "./prismadb"
import getCurrentUser from "./getCurrentUser"

// function to fetch all conversation for logged in user
export default async function getConverstions() {
    const currentUser = await getCurrentUser()

    if (!currentUser) return []

    try {
        const conversations = await prisma.conversation.findMany({
            orderBy: {
                lastMessageAt: "desc",
            },
            where: {
                userIds: {
                    has: currentUser.id,
                },
            },
            include: {
                users: true,
                messages: {
                    include: {
                        sender: true,
                        seen: true,
                    },
                },
            },
        })

        return conversations
    } catch (error) {
        return []
    }
}

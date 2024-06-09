import { NextResponse } from "next/server"
import getCurrentUser from "@/app/_actions/getCurrentUser"
import prisma from "@/app/_libs/prismadb"

export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser()
        const body = await request.json()

        const { conversationId } = body

        if (!currentUser?.id || !currentUser?.email) return new NextResponse("Unauthorized", { status: 401 })

        // find conversation

        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId,
                userIds: {
                    hasSome: [currentUser.id],
                },
            },
            include: {
                users: true,
            },
        })

        if (!conversation) return new NextResponse("Conversation not found", { status: 404 })

        const updatedConversation = await prisma.conversation.update({
            where: {
                id: conversationId,
            },
            data: {
                users: {
                    disconnect: [
                        {
                            id: currentUser.id,
                        },
                    ],
                },
            },

            include: {
                users: true,
            },
        })

        return NextResponse.json(updatedConversation)
    } catch (error) {
        console.log(error, "Failed to exit group conversation")
        return new NextResponse("Internal Error", { status: 500 })
    }
}

// POST endpoint to exit a group conversation
// disconnect keyword helps to remove a connection from a Model

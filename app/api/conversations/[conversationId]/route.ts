import { NextResponse } from "next/server"
import prisma from "@/app/_libs/prismadb"
import getCurrentUser from "@/app/_actions/getCurrentUser"

interface IParams {
    conversationId?: string
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
    try {
        const currentUser = await getCurrentUser()
        const { conversationId } = params

        if (!currentUser || !currentUser?.email) return new NextResponse("Unauthorized", { status: 401 })

        // find existing conversation
        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId,
            },
            include: {
                users: true,
            },
        })

        if (!conversation) return new NextResponse("Invalid ID", { status: 400 })

        const deletedConversation = await prisma.conversation.deleteMany({
            where: {
                id: conversationId,
                userIds: {
                    hasSome: [currentUser.id],
                },
            },
        })

        return NextResponse.json(deletedConversation)
    } catch (error) {
        console.log(error, "Failed to delete the conversation")
        return new NextResponse("Internal Error", { status: 500 })
    }
}

//  delete endpoint to delete a conversation based on its id
// all the related messages are also deleted as we added "onDelete: Cascade" to Message model in prisma schema

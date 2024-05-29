import { NextResponse } from "next/server"
import prisma from "@/app/_libs/prismadb"
import getCurrentUser from "@/app/_actions/getCurrentUser"

interface IParams {
    conversationId?: string
}

export async function POST(request: Request, { params }: { params: IParams }) {
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
                messages: {
                    include: {
                        seen: true,
                    },
                },
                users: true,
            },
        })

        if (!conversation) return new NextResponse("Invalid ID", { status: 400 })

        // find the last message from existing conversation
        const length = conversation.messages.length
        const lastMessage = conversation.messages[length - 1]

        if (!lastMessage) return NextResponse.json(conversation)

        // update "seen" array of last message
        const updatedMessage = await prisma.message.update({
            where: {
                id: lastMessage.id,
            },
            include: {
                sender: true,
                seen: true,
            },
            data: {
                seen: {
                    connect: {
                        id: currentUser.id,
                    },
                },
            },
        })

        return NextResponse.json(updatedMessage)
    } catch (error) {
        console.log(error, "Failed to set seen status for a message")
        return new NextResponse("Internal Error", { status: 500 })
    }
}

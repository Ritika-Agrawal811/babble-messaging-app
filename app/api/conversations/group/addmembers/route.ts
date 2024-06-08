import { NextResponse } from "next/server"
import prisma from "@/app/_libs/prismadb"

export async function POST(request: Request) {
    try {
        const body = await request.json()

        const { conversationId, newMembers } = body

        if (!newMembers) new NextResponse("Invalid Data", { status: 400 })

        // update group conversation with newMembers
        const updatedConversation = await prisma.conversation.update({
            where: {
                id: conversationId,
            },
            data: {
                users: {
                    connect: [
                        ...newMembers.map((member: { id: string }) => ({
                            id: member.id,
                        })),
                    ],
                },
            },
            include: {
                users: true,
            },
        })

        return NextResponse.json(updatedConversation)
    } catch (error) {
        console.log(error, "Failed to add members to group chat")
        return new NextResponse("Internal Error", { status: 500 })
    }
}

// POST endpoint to add the new members to a group conversation

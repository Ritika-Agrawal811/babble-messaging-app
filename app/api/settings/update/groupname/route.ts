import { NextResponse } from "next/server"
import prisma from "@/app/_libs/prismadb"

export async function POST(request: Request) {
    try {
        const body = await request.json()

        const { name, conversationId } = body

        if (!conversationId) return new NextResponse("Invalid Data", { status: 400 })

        // update name of group conversation
        const updatedConversation = await prisma.conversation.update({
            where: {
                id: conversationId,
            },
            data: {
                name,
            },
        })

        return NextResponse.json(updatedConversation)
    } catch (error) {
        console.log(error, "Failed to change group chat's name")
        return new NextResponse("Internal Error", { status: 500 })
    }
}

// POST endpoint to change a group chat's name

import { NextResponse } from "next/server"
import prisma from "@/app/_libs/prismadb"
import { pusherServer } from "@/app/_libs/pusher"
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

        // check if user has already seen the message or perhaps is the sender of this message
        if (!lastMessage || lastMessage.seenIds.indexOf(currentUser.id) !== -1) {
            return NextResponse.json(conversation)
        }

        // fetch all messages the user has not seen
        const unSeenMessages = conversation.messages.filter((message) => {
            const user = message.seen.find((user) => user.email === currentUser.email)

            return !user
        })

        if (unSeenMessages.length === 0) return NextResponse.json(conversation)

        // update "seen" array of unseen messages
        unSeenMessages.forEach(async (message) => {
            const updatedMessage = await prisma.message.update({
                where: {
                    id: message.id,
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

            await pusherServer.trigger(currentUser.email!, "conversation:update", {
                id: conversationId,
                messages: [updatedMessage],
            })

            await pusherServer.trigger(conversationId!, "message:update", updatedMessage)
        })

        return NextResponse.json(true)
    } catch (error) {
        console.log(error, "Failed to set seen status for a message")
        return new NextResponse("Internal Error", { status: 500 })
    }
}

// post endpoint to handle seen status for a message
// the current user is included in the seen array for all unseen messages of a conversation when it is opened by them

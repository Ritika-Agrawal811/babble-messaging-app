import { NextResponse } from "next/server"
import getCurrentUser from "@/app/_actions/getCurrentUser"
import prisma from "@/app/_libs/prismadb"

export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser()
        const body = await request.json()

        const { userId, isGroup, members, name } = body

        if (!currentUser?.id || !currentUser?.email) return new NextResponse("Unauthorized", { status: 401 })

        // validate group details
        if (isGroup && (!members || members.length < 2 || !name))
            return new NextResponse("Invalid Data", { status: 400 })

        if (isGroup) {
            // create a group
            const newConversation = await prisma.conversation.create({
                data: {
                    name,
                    isGroup,
                    users: {
                        connect: [
                            ...members.map((member: { id: string }) => ({
                                id: member.id,
                            })),
                            {
                                id: currentUser.id,
                            },
                        ],
                    },
                },
                // since we are only passing ids in members array,
                // include helps to populate other details of users as well
                include: {
                    users: true,
                },
            })

            return NextResponse.json(newConversation)
        }

        // handle single conversation

        // check for existing one-to-one conversation
        const existingConversations = await prisma.conversation.findMany({
            where: {
                OR: [
                    {
                        userIds: {
                            equals: [currentUser.id, userId],
                        },
                    },
                    {
                        userIds: {
                            equals: [userId, currentUser.id],
                        },
                    },
                ],
            },
        })

        const singleConversation = existingConversations[0]

        if (singleConversation) return NextResponse.json(singleConversation)

        // create a new conversation when it doesn't already exist
        const newConversation = await prisma.conversation.create({
            data: {
                users: {
                    connect: [
                        {
                            id: currentUser.id,
                        },
                        {
                            id: userId,
                        },
                    ],
                },
            },
            include: {
                users: true,
            },
        })

        return NextResponse.json(newConversation)
    } catch (error) {
        console.log(error, "Failed to start conversation")
        return new NextResponse("Internal Error", { status: 500 })
    }
}

// post endpoint to create a new conversation
// handles both group and one-to-one conversations

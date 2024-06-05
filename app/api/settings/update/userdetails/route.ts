import { NextResponse } from "next/server"
import getCurrentUser from "@/app/_actions/getCurrentUser"
import prisma from "@/app/_libs/prismadb"

export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser()
        const body = await request.json()

        const { name } = body

        if (!currentUser?.id || !currentUser?.email) return new NextResponse("Unauthorized", { status: 401 })

        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id,
            },
            data: {
                name,
                updatedAt: new Date(),
            },
        })

        return NextResponse.json(updatedUser)
    } catch (error) {
        console.log(error, "Failed to update basic details")
        return new NextResponse("Internal Error", { status: 500 })
    }
}

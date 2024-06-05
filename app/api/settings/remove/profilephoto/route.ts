import { NextResponse } from "next/server"
import getCurrentUser from "@/app/_actions/getCurrentUser"
import prisma from "@/app/_libs/prismadb"

import { getImagePublicId } from "@/app/_libs/getImagePublicId"
import { deleteCloudinaryImage } from "@/app/_libs/deleteCloudinaryImage"

export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser()

        if (!currentUser?.id || !currentUser?.email) return new NextResponse("Unauthorized", { status: 401 })

        // set image to null in the database
        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id,
            },
            data: {
                image: null,
                updatedAt: new Date(),
            },
        })

        // remove image from cloudinary platform

        if (!currentUser?.image) return new NextResponse("No previous image set", { status: 404 })

        // If the image is on cloudinary, then remove it
        if (currentUser.image.includes("cloudinary")) {
            const imagePublicId = getImagePublicId(currentUser.image)
            await deleteCloudinaryImage(imagePublicId)
        }

        return NextResponse.json(updatedUser)
    } catch (error) {
        console.log(error, "Failed to start conversation")
        return new NextResponse("Internal Error", { status: 500 })
    }
}

// post endpoint to remove profile picture of the user

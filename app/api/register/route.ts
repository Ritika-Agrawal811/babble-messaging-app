import bcrypt from "bcrypt"
import prisma from "@/app/_libs/prismadb"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { email, name, password } = body

        if (!email || !name || !password) {
            return new NextResponse("Missing information. Failed to register user.", { status: 404 })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword,
            },
        })

        return NextResponse.json(user)
    } catch (error) {
        console.log(error, "REGISTRATION_ERRRO")
        return new NextResponse("Internal Error", { status: 500 })
    }
}

// Post endpoint to register a new user to mongodb
// bcrpt hashes the entered password and prisma stores the user details to the database

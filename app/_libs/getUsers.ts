import prisma from "./prismadb"
import getSession from "./getSession"

// function to fetch all users from database except logged in user
export default async function getUsers() {
    const session = await getSession()

    if (!session || !session?.user?.email) {
        return []
    }

    try {
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: "desc",
            },
            where: {
                NOT: {
                    email: session.user.email,
                },
            },
        })

        return users
    } catch (error) {
        return []
    }
}

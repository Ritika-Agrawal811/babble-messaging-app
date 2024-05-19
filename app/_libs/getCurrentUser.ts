import prisma from "./prismadb"
import getSession from "./getSession"

export default async function getCurrentUser() {
    try {
        const session = await getSession()

        if (!session || !session?.user?.email) {
            return null
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email,
            },
        })

        return currentUser ? currentUser : null
    } catch (error) {
        return null
    }
}

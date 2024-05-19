import { getServerSession, Session } from "next-auth"

import { handler } from "../api/auth/[...nextauth]/route"

export default async function getSession(): Promise<Session | null> {
    return await getServerSession(handler)
}

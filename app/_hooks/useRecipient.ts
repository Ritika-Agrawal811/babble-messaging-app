import { useSession } from "next-auth/react"

import type { FullConversation } from "../_types"
import type { User } from "@prisma/client"

type Input =
    | FullConversation
    | {
          users: User[]
      }

const useRecipient = (conversations: Input) => {
    const { data: session } = useSession()

    const currentUserEmail = session?.user?.email
    const recipient = conversations.users.filter((user) => user.email !== currentUserEmail)

    return recipient[0]
}

export default useRecipient

// a hook to fetch all the people, the user has had conversations with

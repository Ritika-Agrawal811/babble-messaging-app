import clsx from "clsx"
import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { handleRequestError } from "@/app/_libs/handleRequestError"

import type { User } from "@prisma/client"

// components
import Avatar from "@/app/_components/Avatar"
import LoadingScreen from "@/app/_components/LoadingScreen"

interface UserBoxProps {
    user: User
}

const UserBox: React.FC<UserBoxProps> = ({ user }) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    // a function to create a conversation when the user clicks on a user card
    const createConversationHandler = async () => {
        try {
            setIsLoading(true)
            const response = await axios.post("/api/conversations", { userId: user.id })

            if (response.status !== 200) throw new Error("Unable to start a conversation")

            // redirect to the newly created conversation's window
            const conversationId = response.data.id
            router.push(`/conversations/${conversationId}`)
        } catch (error) {
            handleRequestError(error)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <>
            {isLoading && <LoadingScreen />}

            <article
                onClick={createConversationHandler}
                className={clsx(
                    "px-3 py-4",
                    "flex gap-3",
                    "cursor-pointer transition-colors duration-75 hover:bg-neutral-50"
                )}
            >
                <Avatar image={user.image} size='default' />
                <div className='flex flex-1 items-center'>
                    <h4 className='font-semibold text-gray-900'>{user.name}</h4>
                </div>
            </article>
        </>
    )
}

export default UserBox

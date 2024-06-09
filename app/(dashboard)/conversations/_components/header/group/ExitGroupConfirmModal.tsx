"use client"

import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/navigation"
import useConversation from "@/app/_hooks/useConversation"
import { handleRequestError } from "@/app/_libs/handleRequestError"

// components
import Modal from "@/app/_components/Modal"
import toast from "react-hot-toast"
import { FiAlertTriangle } from "react-icons/fi"
import Button from "@/app/_components/Button"
import Loader from "@/app/_components/Loader"

interface ExitGroupConfirmModal {
    isOpen: boolean
    onClose: () => void
}

const ExitGroupConfirmModal: React.FC<ExitGroupConfirmModal> = ({ isOpen, onClose }) => {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const { conversationId } = useConversation()

    const exitConversationHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        try {
            setIsLoading(true)

            const response = await axios.post("/api/conversations/group/exit", {
                conversationId,
            })

            if (response.status !== 200) throw new Error("Failed to exit group chat")

            toast.success("You have successfully exited the group!")
            router.push("/conversations")
        } catch (error) {
            handleRequestError(error)
        } finally {
            setIsLoading(false)
            onClose()
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <section className='mx-2 my-4'>
                <div className='flex items-center gap-4'>
                    <FiAlertTriangle className='text-2xl text-red-600' />

                    <h3 className='text-lg font-medium text-red-600'>Exit Group</h3>
                </div>
                <p className='my-2 text-sm text-gray-700'>
                    You will no longer be able to participate and lose access to all future messages and media shared in
                    this conversation.
                </p>

                <div className='mt-6 flex justify-end gap-4'>
                    <Button type='button' variant='secondary' onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        type='button'
                        variant='danger'
                        disabled={isLoading}
                        onClick={(e) => exitConversationHandler(e)}
                    >
                        <span className='flex items-center gap-4'>
                            {isLoading && <Loader variant='danger' />}
                            Exit
                        </span>
                    </Button>
                </div>
            </section>
        </Modal>
    )
}

export default ExitGroupConfirmModal

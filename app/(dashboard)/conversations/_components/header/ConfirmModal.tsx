"use client"

import clsx from "clsx"
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

interface ConfirmModalProps {
    isOpen: boolean
    onClose: () => void
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose }) => {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const { conversationId } = useConversation()

    const deleteConversationHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        try {
            setIsLoading(true)

            const response = await axios.delete(`/api/conversations/${conversationId}`)

            if (response.status !== 200) throw new Error("Failed to delete conversation")

            toast.success("Your conversation is deleted successfully!")
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

                    <h3 className='text-lg font-medium text-red-600'>Delete Conversation</h3>
                </div>
                <p className='mt-2 text-sm text-gray-700'>
                    Once deleted, all messages and media within this conversation will be permanently lost and cannot be
                    retrieved.
                </p>

                <div className='flex justify-end gap-4'>
                    <Button type='button' variant='secondary' onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        type='button'
                        variant='danger'
                        disabled={isLoading}
                        onClick={(e) => deleteConversationHandler(e)}
                    >
                        Delete
                    </Button>
                </div>
            </section>
        </Modal>
    )
}

export default ConfirmModal

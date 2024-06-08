"use client"

import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/navigation"
import type { User } from "@prisma/client"
import { handleRequestError } from "@/app/_libs/handleRequestError"
import useConversation from "@/app/_hooks/useConversation"

// components
import Modal from "@/app/_components/Modal"
import UserBox from "../group-drawer/UserBox"
import Button from "@/app/_components/Button"
import toast from "react-hot-toast"
import Loader from "@/app/_components/Loader"

interface AddMembersModalProps {
    isOpen: boolean
    onClose: () => void
    nonGroupMembers: User[]
}

const AddMembersModal: React.FC<AddMembersModalProps> = ({ isOpen, onClose, nonGroupMembers }) => {
    const [selectedUsers, setSelectedUsers] = useState<User[] | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const { conversationId } = useConversation()
    const router = useRouter()

    // add new members to the group chat by making a call to "/api/conversations/group/addmembers" POST endpoint
    const addMembersHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()

        if (!selectedUsers) return

        try {
            setIsLoading(true)
            const response = await axios.post("/api/conversations/group/addmembers", {
                conversationId,
                newMembers: selectedUsers,
            })

            if (response.status !== 200) throw new Error("Unable to create a group")

            toast.success("New members successfully added")
            router.refresh()
        } catch (error) {
            handleRequestError(error)
        } finally {
            setIsLoading(false)
            onClose()
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <section>
                <h3 className='text-lg font-semibold text-neutral-800'>Add Members</h3>
                <hr className='mt-4 border-b border-gray-100' />

                <div className='max-h-[18rem] overflow-y-auto'>
                    {nonGroupMembers.map((user) => (
                        <UserBox
                            key={user.id}
                            user={user}
                            setSelectedUsers={setSelectedUsers}
                            isSelected={selectedUsers ? !!selectedUsers.find((item) => item.id === user.id) : false}
                        />
                    ))}
                </div>

                {selectedUsers && selectedUsers.length > 0 && (
                    <div className='mt-6 flex justify-end'>
                        <Button type='button' variant='primary' disabled={isLoading} onClick={addMembersHandler}>
                            <span className='flex items-center gap-2'>
                                {isLoading && <Loader />}
                                Add
                            </span>
                        </Button>
                    </div>
                )}
            </section>
        </Modal>
    )
}

export default AddMembersModal

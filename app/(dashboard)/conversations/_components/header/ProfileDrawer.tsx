"use client"

import clsx from "clsx"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { slideInRight, fadeIn } from "@/app/_variants/variants"

import type { Conversation, User } from "@prisma/client"
import type { FullConversation } from "@/app/_types"

// components
import { IoClose } from "react-icons/io5"
import DeleteChatConfirmModal from "./individual/DeleteChatConfirmModal"
import AddMembersModal from "./group/AddMembersModal"
import ExitGroupConfirmModal from "./group/ExitGroupConfirmModal"
import ProfileDrawerHeader from "./ProfileDrawerHeader"
import ProfileDrawerBody from "./ProfileDrawerBody"
import ProfileDrawerFooter from "./ProfileDrawerFooter"

interface ProfileDrawerProps {
    allUserConversations: FullConversation[]
    conversation: Conversation & {
        users: User[]
    }
    users: User[]
    isOpen: boolean
    onClose: () => void
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
    conversation,
    isOpen,
    onClose,
    users,
    allUserConversations,
}) => {
    const [isModalOpen, setIsModalOpen] = useState({
        deleteChat: false,
        addMembers: false,
        exitGroup: false,
    })

    // find non group members from users list
    const nonGroupMembers = users.filter((item) => !conversation.users.find((member) => member.id === item.id))

    const closeModalHandler = (modalName: keyof typeof isModalOpen) => {
        setIsModalOpen((prev) => ({ ...prev, [modalName]: false }))
    }

    const openModalHandler = (modalName: keyof typeof isModalOpen) => {
        setIsModalOpen((prev) => ({ ...prev, [modalName]: true }))
    }

    return (
        <>
            <DeleteChatConfirmModal isOpen={isModalOpen.deleteChat} onClose={() => closeModalHandler("deleteChat")} />
            <ExitGroupConfirmModal isOpen={isModalOpen.exitGroup} onClose={() => closeModalHandler("exitGroup")} />
            <AddMembersModal
                isOpen={isModalOpen.addMembers}
                onClose={() => closeModalHandler("addMembers")}
                nonGroupMembers={nonGroupMembers}
            />

            <AnimatePresence>
                {isOpen && (
                    <motion.div className='relative z-40' initial='initial' animate='animate' exit='initial'>
                        {/* backdrop */}
                        <motion.div
                            className={clsx("fixed inset-0", "cursor-pointer bg-black bg-opacity-40")}
                            variants={fadeIn}
                            onClick={onClose}
                        ></motion.div>

                        {/* profile drawer */}
                        <motion.div
                            className={clsx("w-screen max-w-sm", "fixed inset-y-0 right-0")}
                            variants={slideInRight}
                        >
                            <div
                                className={clsx(
                                    "h-full overflow-y-auto",
                                    "bg-white py-4 shadow-xl",
                                    "px-4 sm:px-6",
                                    "flex flex-col"
                                )}
                            >
                                {/* close button */}

                                <button
                                    className={clsx(
                                        "self-end rounded-md text-gray-400 hover:text-gray-500",
                                        "focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                                    )}
                                    onClick={onClose}
                                >
                                    <span className='sr-only'>Close panel</span>
                                    <IoClose className='text-2xl' />
                                </button>

                                {/* user/group image and name section */}
                                <ProfileDrawerHeader conversation={conversation} />

                                {/* user or group details */}
                                <ProfileDrawerBody
                                    allUserConversations={allUserConversations}
                                    conversation={conversation}
                                    onClick={() => openModalHandler("addMembers")}
                                />

                                {/* delete chat or exit group button */}
                                <ProfileDrawerFooter
                                    onClick={() =>
                                        !!conversation?.isGroup
                                            ? openModalHandler("exitGroup")
                                            : openModalHandler("deleteChat")
                                    }
                                    isGroup={!!conversation?.isGroup}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default ProfileDrawer

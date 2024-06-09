"use client"

import clsx from "clsx"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { format } from "date-fns"
import useRecipient from "@/app/_hooks/useRecipient"
import { slideInRight, fadeIn } from "@/app/_variants/variants"

import type { Conversation, User } from "@prisma/client"

// components
import { IoClose, IoTrash, IoExitOutline } from "react-icons/io5"
import Avatar from "@/app/_components/Avatar"
import DeleteChatConfirmModal from "./individual/DeleteChatConfirmModal"
import RecipientDetails from "./individual/RecipientDetails"
import MembersList from "./group/MembersList"
import AddMembersModal from "./group/AddMembersModal"
import GroupName from "./group/GroupName"
import ExitGroupConfirmModal from "./group/ExitGroupConfirmModal"

interface ProfileDrawerProps {
    conversation: Conversation & {
        users: User[]
    }
    users: User[]
    isOpen: boolean
    onClose: () => void
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({ conversation, isOpen, onClose, users }) => {
    const [isModalOpen, setIsModalOpen] = useState({
        deleteChat: false,
        addMembers: false,
        exitGroup: false,
    })

    const recipient = useRecipient(conversation)

    const title = conversation.name || recipient.name
    const joinedDate = format(new Date(recipient.createdAt), "PP")
    const statusText = conversation.isGroup ? `Group • ${conversation.users.length} members` : "Online"

    // find non group members from users list
    const nonGroupMembers = users.filter((item) => !conversation.users.find((member) => member.id === item.id))

    const details = [
        {
            title: "Email",
            content: recipient.email,
        },
        {
            title: "Joined",
            content: joinedDate,
        },
    ]

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

                                {/* user Image and name section */}
                                <section>
                                    <Avatar
                                        image={recipient.image}
                                        size='large'
                                        showStatus={false}
                                        isGroup={!!conversation?.isGroup}
                                    />
                                    {title && !!conversation?.isGroup ? (
                                        <GroupName title={title} />
                                    ) : (
                                        <h2 className='mt-2 text-center text-2xl text-gray-900'>{title}</h2>
                                    )}
                                    <p className='mt-1 text-center text-gray-500'>{statusText}</p>
                                </section>

                                <hr className='mt-4 border-b border-gray-100' />

                                {/* user or group details */}
                                {!!conversation.isGroup ? (
                                    <MembersList
                                        members={conversation.users}
                                        onClick={() => openModalHandler("addMembers")}
                                    />
                                ) : (
                                    <RecipientDetails details={details} />
                                )}

                                <hr className='mt-4 border-b border-gray-100' />

                                {/* delete chat button */}
                                <button
                                    onClick={() =>
                                        !!conversation?.isGroup
                                            ? openModalHandler("exitGroup")
                                            : openModalHandler("deleteChat")
                                    }
                                    className={clsx(
                                        "flex items-center justify-center gap-2",
                                        "mt-auto w-full p-2 shadow-sm",
                                        "text-lg font-medium text-red-600",
                                        "rounded-md border-2 border-red-600",
                                        "transition duration-200 ease-in hover:scale-95"
                                    )}
                                >
                                    {!!conversation?.isGroup ? (
                                        <>
                                            <IoExitOutline className='text-2xl' />
                                            <span>Exit Group</span>
                                        </>
                                    ) : (
                                        <>
                                            <IoTrash className='text-xl' />
                                            <span>Delete Chat</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default ProfileDrawer

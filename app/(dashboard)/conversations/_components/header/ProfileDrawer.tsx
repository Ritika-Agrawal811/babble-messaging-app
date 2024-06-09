"use client"

import clsx from "clsx"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { format } from "date-fns"
import useRecipient from "@/app/_hooks/useRecipient"
import { slideInRight, fadeIn } from "@/app/_variants/variants"

import type { Conversation, User } from "@prisma/client"

// components
import { IoClose, IoTrash } from "react-icons/io5"
import Avatar from "@/app/_components/Avatar"
import ConfirmModal from "./ConfirmModal"
import RecipientDetails from "./RecipientDetails"
import MembersList from "./MembersList"
import AddMembersModal from "./AddMembersModal"
import GroupName from "./GroupName"

interface ProfileDrawerProps {
    conversation: Conversation & {
        users: User[]
    }
    users: User[]
    isOpen: boolean
    onClose: () => void
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({ conversation, isOpen, onClose, users }) => {
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
    const [isAddMembersModalOpen, setIsAddsMembersModalOpen] = useState(false)
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

    return (
        <>
            <ConfirmModal isOpen={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)} />
            <AddMembersModal
                isOpen={isAddMembersModalOpen}
                onClose={() => setIsAddsMembersModalOpen(false)}
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
                                        onClick={() => setIsAddsMembersModalOpen(true)}
                                    />
                                ) : (
                                    <RecipientDetails details={details} />
                                )}

                                <hr className='mt-4 border-b border-gray-100' />

                                {/* delete chat button */}
                                <button
                                    onClick={() => setIsConfirmModalOpen(true)}
                                    className={clsx(
                                        "flex items-center justify-center gap-2",
                                        "mt-auto w-full p-2 shadow-sm",
                                        "text-lg text-red-600",
                                        "rounded-md border-2 border-red-600",
                                        "transition duration-200 ease-in hover:scale-95"
                                    )}
                                >
                                    <IoTrash className='text-xl' />
                                    <span>Delete Chat</span>
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

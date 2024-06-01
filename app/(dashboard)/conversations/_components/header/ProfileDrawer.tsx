"use client"

import clsx from "clsx"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { format } from "date-fns"
import useRecipient from "@/app/_hooks/useRecipient"
import { slideIn, fadeIn } from "@/app/_variants/variants"

import type { Conversation, User } from "@prisma/client"

// components
import { IoClose, IoTrash } from "react-icons/io5"
import Avatar from "@/app/_components/Avatar"
import Modal from "@/app/_components/Modal"

interface ProfileDrawerProps {
    conversation: Conversation & {
        users: User[]
    }
    isOpen: boolean
    onClose: () => void
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({ conversation, isOpen, onClose }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const recipient = useRecipient(conversation)

    const title = conversation.name || recipient.name
    const joinedDate = format(new Date(recipient.createdAt), "PP")
    const statusText = conversation.isGroup ? `${conversation.users.length} memebers` : "Online"

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

    const openDeleteConfirmPopUp = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        setIsModalOpen(true)
    }

    return (
        <>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className='bg-white p-4'>
                    <p>yoo</p>
                </div>
            </Modal>

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
                        <motion.div className={clsx("w-screen max-w-md", "fixed inset-y-0 right-0")} variants={slideIn}>
                            <div
                                onClick={onClose}
                                className={clsx(
                                    "h-full overflow-y-auto",
                                    "cursor-pointer bg-white py-4 shadow-xl",
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
                                    <Avatar image={recipient.image} size='large' showStatus={false} />
                                    <h2 className='mt-2 text-center text-2xl text-gray-900'>{title}</h2>
                                    <p className='mt-1 text-center text-gray-500'>{statusText}</p>
                                </section>

                                <hr className='mt-4 border-b border-gray-100' />

                                {/* user details */}
                                <section className='mx-auto mt-4 w-full xs:w-4/5'>
                                    {details.map((item, index) => {
                                        const { title, content } = item

                                        return (
                                            <div key={index} className='mb-2 flex justify-between'>
                                                <h3 className='text-gray-800'>{title}</h3>
                                                <p className='text-sm italic text-sky-500'>{content}</p>
                                            </div>
                                        )
                                    })}
                                </section>

                                <hr className='mt-4 border-b border-gray-100' />

                                {/* delete chat button */}
                                <button
                                    onClick={openDeleteConfirmPopUp}
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

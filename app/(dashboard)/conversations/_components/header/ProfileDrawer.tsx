"use client"

import clsx from "clsx"
import { Fragment } from "react"
import { format } from "date-fns"
import useRecipient from "@/app/_hooks/useRecipient"

import type { Conversation, User } from "@prisma/client"

// components
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react"
import { IoClose, IoTrash } from "react-icons/io5"
import Avatar from "@/app/_components/Avatar"

interface ProfileDrawerProps {
    conversation: Conversation & {
        users: User[]
    }
    isOpen: boolean
    onClose: () => void
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({ conversation, isOpen, onClose }) => {
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

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as='div' className='relative z-50' onClose={onClose}>
                <TransitionChild
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-300'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className={clsx("fixed inset-0", "bg-black bg-opacity-40")}></div>
                </TransitionChild>

                <TransitionChild
                    as={Fragment}
                    enter='transform transition ease-in-out duration-300'
                    enterFrom='translate-x-full'
                    enterTo='translate-x-0'
                    leave='transform transition ease-in-out duration-300'
                    leaveTo='translate-x-full'
                >
                    <DialogPanel className={clsx("w-screen max-w-md", "fixed inset-y-0 right-0")}>
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
                    </DialogPanel>
                </TransitionChild>
            </Dialog>
        </Transition>
    )
}

export default ProfileDrawer

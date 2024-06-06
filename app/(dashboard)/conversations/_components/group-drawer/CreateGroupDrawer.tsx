import clsx from "clsx"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { slideInLeft } from "@/app/_variants/variants"

import type { User } from "@prisma/client"

// components
import { MdOutlineSearch } from "react-icons/md"
import { HiChevronLeft } from "react-icons/hi2"
import GroupUserList from "./group-user-list/GroupUserList"

interface CreateGroupDrawerProps {
    users: User[]
    isOpen: boolean
    onClose: () => void
}

const CreateGroupDrawer: React.FC<CreateGroupDrawerProps> = ({ isOpen, onClose, users }) => {
    const [usersList, setUsersList] = useState<User[]>(users)
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.section
                    className={clsx("absolute z-30 h-full w-full", "bg-white", "flex flex-col")}
                    variants={slideInLeft}
                    initial='initial'
                    animate='animate'
                    exit='initial'
                >
                    <h3
                        className={clsx(
                            "flex items-center justify-between",
                            "py-3 pr-4",
                            "border-b border-gray-100 shadow-sm shadow-zinc-50"
                        )}
                    >
                        <div className='flex items-center gap-2'>
                            <HiChevronLeft className='cursor-pointer text-2xl text-gray-800' onClick={onClose} />
                            <div>
                                <p className='font-semibold text-neutral-800'>New Group</p>
                                <p className='-mt-0.5 text-sm text-gray-500'>Add members</p>
                            </div>
                        </div>
                        <MdOutlineSearch
                            className={clsx(
                                "cursor-pointer text-2xl",
                                "text-gray-500 transition-colors duration-100 hover:text-sky-500"
                            )}
                        />
                    </h3>

                    <GroupUserList users={usersList} />
                </motion.section>
            )}
        </AnimatePresence>
    )
}

export default CreateGroupDrawer

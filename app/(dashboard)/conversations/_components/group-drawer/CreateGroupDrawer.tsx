import clsx from "clsx"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { slideInLeftHalf, slideOutRightHalf } from "@/app/_variants/variants"

import type { User } from "@prisma/client"

// components
import SelectGroupMembers from "./SelectGroupMembers"
import CreateGroupForm from "./CreateGroupForm"

interface CreateGroupDrawerProps {
    users: User[]
    isOpen: boolean
    onClose: () => void
}

const CreateGroupDrawer: React.FC<CreateGroupDrawerProps> = ({ isOpen, onClose, users }) => {
    const [usersList, setUsersList] = useState<User[]>(users)
    const [selectedUsers, setSelectedUsers] = useState<User[] | null>(null)
    const [proceedToNext, setProceedToNext] = useState(false)

    const closeGroupDrawerHandler = () => {
        setProceedToNext(false)
        onClose()
        setSelectedUsers(null)
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.section
                    className={clsx("absolute z-30 h-full w-[200%]", "bg-white", "grid grid-cols-2")}
                    variants={proceedToNext ? slideOutRightHalf : slideInLeftHalf}
                    initial='initial'
                    animate='animate'
                    exit='initial'
                >
                    <CreateGroupForm
                        selectedUsers={selectedUsers}
                        onGoToPrev={() => setProceedToNext(false)}
                        onClose={closeGroupDrawerHandler}
                    />
                    <SelectGroupMembers
                        users={usersList}
                        selectedUsers={selectedUsers}
                        setSelectedUsers={setSelectedUsers}
                        onClose={onClose}
                        onProceedToNext={() => setProceedToNext(true)}
                    />
                </motion.section>
            )}
        </AnimatePresence>
    )
}

export default CreateGroupDrawer

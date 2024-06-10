"use client"

import clsx from "clsx"

// components
import { IoTrash, IoExitOutline } from "react-icons/io5"

interface ProfileDrawerFooterProps {
    isGroup: boolean
    onClick: () => void
}

const ProfileDrawerFooter: React.FC<ProfileDrawerFooterProps> = ({ isGroup, onClick }) => {
    return (
        <>
            {/* delete chat or exit group button */}
            <button
                onClick={onClick}
                className={clsx(
                    "flex items-center justify-center gap-2",
                    "mt-auto w-full p-2 shadow-sm",
                    "text-lg font-medium text-red-600",
                    "rounded-md border-2 border-red-600",
                    "transition duration-200 ease-in hover:scale-95"
                )}
            >
                {isGroup ? (
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
        </>
    )
}

export default ProfileDrawerFooter

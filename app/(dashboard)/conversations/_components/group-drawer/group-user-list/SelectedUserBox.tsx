"use client"

import { formatNames } from "@/app/_libs/formatNames"

import type { User } from "@prisma/client"

// components
import Avatar from "@/app/_components/Avatar"
import { IoCloseCircle } from "react-icons/io5"

interface SelectedUserBoxProps {
    user: User
    onClick: () => void
}

const SelectedUserBox: React.FC<SelectedUserBoxProps> = ({ user, onClick }) => {
    return (
        <div className='cursor-pointer p-2' onClick={onClick}>
            <figure className='relative rounded-full'>
                <Avatar image={user.image} size='big' showStatus={false} />
                <span className='absolute -right-1 -top-1 rounded-full bg-white'>
                    <IoCloseCircle className='text-lg text-red-600' />
                </span>
            </figure>
            {user?.name && <p className='mt-1 text-center text-sm'>{formatNames(user?.name)}</p>}
        </div>
    )
}

export default SelectedUserBox

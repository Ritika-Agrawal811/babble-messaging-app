"use client"

import clsx from "clsx"
import type { User } from "@prisma/client"

// components
import Avatar from "@/app/_components/Avatar"
import { HiUserPlus } from "react-icons/hi2"

interface MembersListProps {
    members: User[]
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const MembersList: React.FC<MembersListProps> = ({ members, onClick }) => {
    return (
        <section>
            <nav className='my-3 ml-1 flex items-center justify-between'>
                <h4 className='font-medium text-neutral-800'>{members.length} Members</h4>
                <button
                    className={clsx(
                        "flex items-center gap-2",
                        "rounded-md p-2 text-sm font-medium text-white",
                        "bg-sky-500 transition duration-100 hover:bg-sky-600"
                    )}
                    onClick={onClick}
                >
                    <HiUserPlus className='text-xl' /> Add member
                </button>
            </nav>
            {members.map((item) => {
                return (
                    <article key={item.id} className='flex items-center gap-4 p-3'>
                        <Avatar image={item.image} size='default' showStatus={false} />
                        <h5 className='font-medium text-gray-900'>{item.name}</h5>
                    </article>
                )
            })}
        </section>
    )
}

export default MembersList

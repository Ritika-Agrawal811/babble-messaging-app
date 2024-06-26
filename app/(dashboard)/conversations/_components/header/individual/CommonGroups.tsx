"use client"

import clsx from "clsx"
import type { Conversation } from "@prisma/client"

// components
import Avatar from "@/app/_components/Avatar"

interface CommonGroupsProps {
    groups: Conversation[]
}

const CommonGroups: React.FC<CommonGroupsProps> = ({ groups }) => {
    return (
        <>
            {groups.length > 0 && (
                <section>
                    <nav className='my-3 ml-1 flex items-center justify-between'>
                        <h4 className='font-medium text-neutral-800'>
                            {groups.length} group{groups.length > 1 && "s"} in common
                        </h4>
                    </nav>
                    {groups.map((item) => {
                        return (
                            <article key={item.id} className='flex items-center gap-4 p-3'>
                                <Avatar image='' size='default' showStatus={false} isGroup={true} />
                                <div>
                                    <h5 className='font-medium text-gray-900'>{item.name}</h5>
                                    <p className='text-center text-sm text-gray-500'>{item.userIds.length} members</p>
                                </div>
                            </article>
                        )
                    })}
                </section>
            )}
        </>
    )
}

export default CommonGroups

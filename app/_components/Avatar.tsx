"use client"

import clsx from "clsx"
import { User } from "@prisma/client"

// components
import Image from "next/image"

interface AvatarProps {
    user: User
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
    return (
        <div className={clsx("my-4 cursor-pointer transition hover:opacity-75", "flex justify-center")}>
            <div className={clsx("relative rounded-full", "h-9 w-9")}>
                <Image
                    alt='avatar'
                    src={user?.image || "/images/user-placeholder.webp"}
                    width={300}
                    height={300}
                    className='rounded-full object-cover'
                />
                <span
                    className={clsx(
                        "h-2 w-2",
                        "absolute right-0 top-0",
                        "block rounded-full bg-green-500 ring-2 ring-white"
                    )}
                ></span>
            </div>
        </div>
    )
}

export default Avatar

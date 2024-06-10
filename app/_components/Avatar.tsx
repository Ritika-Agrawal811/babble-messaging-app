"use client"

import clsx from "clsx"

// components
import Image from "next/image"

interface AvatarProps {
    image: string | null
    size: keyof typeof sizes
    showStatus?: boolean
    isGroup?: boolean
}

const Avatar: React.FC<AvatarProps> = ({ image, size, showStatus = true, isGroup = false }) => {
    const imageURL = isGroup ? "/images/group-placeholder.jpg" : image || "/images/user-placeholder.webp"

    return (
        <div className='flex items-center justify-center'>
            <div className={clsx("relative rounded-full", sizes[size])}>
                <Image
                    alt='avatar'
                    src={imageURL}
                    width={300}
                    height={300}
                    className='h-full rounded-full object-cover'
                />
                {showStatus && (
                    <span
                        className={clsx(
                            "h-2 w-2",
                            "absolute right-0 top-0",
                            "block rounded-full bg-green-500 ring-2 ring-white"
                        )}
                    ></span>
                )}
            </div>
        </div>
    )
}

export default Avatar

const sizes = {
    small: "h-9 w-9",
    default: "h-10 w-10",
    big: "h-12 w-12",
    large: "h-20 w-20 xl:h-24 xl:w-24",
}

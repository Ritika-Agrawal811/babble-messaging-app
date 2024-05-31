"use client"

import clsx from "clsx"

// components
import Image from "next/image"

interface AvatarProps {
    image: string | null
    size: "small" | "big" | "large"
    showStatus?: boolean
}

const Avatar: React.FC<AvatarProps> = ({ image, size, showStatus = true }) => {
    return (
        <div className={clsx("cursor-pointer transition hover:opacity-75", "flex items-center justify-center")}>
            <div className={clsx("relative rounded-full", sizes[size])}>
                <Image
                    alt='avatar'
                    src={image || "/images/user-placeholder.webp"}
                    width={300}
                    height={300}
                    className='rounded-full object-cover'
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
    big: "h-10 w-10",
    large: "h-20 w-20 xl:h-24 xl:w-24",
}

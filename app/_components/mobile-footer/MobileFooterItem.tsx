"use client"

import clsx from "clsx"
import Link from "next/link"

import type { IconType } from "react-icons"
interface MobileFooterItemProps {
    label: string
    href: string
    icon: IconType
    active?: boolean
    onClick?: () => void
}

const MobileFooterItem: React.FC<MobileFooterItemProps> = ({ label, href, icon: Icon, active, onClick }) => {
    return (
        <li onClick={onClick && onClick} className='grow'>
            <Link
                href={href}
                className={clsx(
                    "flex justify-center",
                    "p-4",
                    "font-semibold text-gray-500 transition-colors duration-100 hover:text-sky-500",
                    active &&
                        "relative bg-gray-50 text-sky-500 before:absolute before:left-0 before:top-0 before:h-1 before:w-full before:bg-sky-500"
                )}
            >
                <Icon className='h-6 w-6 shrink-0' />
                <span className='sr-only'>{label}</span>
            </Link>
        </li>
    )
}

export default MobileFooterItem

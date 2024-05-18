"use client"

import clsx from "clsx"
import Link from "next/link"
import { IconType } from "react-icons"

// components
import Tooltip from "@/app/_components/Tooltip"

interface SidebarItemProps {
    label: string
    href: string
    icon: IconType
    active?: boolean
    onClick?: () => void
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, href, icon: Icon, active, onClick }) => {
    return (
        <li onClick={onClick && onClick} className='group relative'>
            <Link
                href={href}
                className={clsx(
                    "flex items-center gap-x-2",
                    "p-4",
                    "font-semibold text-gray-500 transition-colors duration-100 hover:text-sky-500",
                    "text-2xl",
                    active &&
                        "relative bg-gray-50 text-sky-500 before:absolute before:left-0 before:h-full before:w-1 before:bg-sky-500"
                )}
            >
                <Icon className='h-6 w-6 shrink-0' />
                <span className='sr-only'>{label}</span>
            </Link>

            <Tooltip position='right' label={label} />
        </li>
    )
}

export default SidebarItem

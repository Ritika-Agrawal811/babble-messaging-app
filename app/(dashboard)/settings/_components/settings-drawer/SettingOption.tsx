import clsx from "clsx"

import type { IconType } from "react-icons"

interface SettingOptionProps {
    label: string
    icon: IconType
    selected?: boolean
    onClick: () => void
}

const SettingOption: React.FC<SettingOptionProps> = ({ label, icon: Icon, selected, onClick }) => {
    return (
        <li
            className={clsx(
                "px-3 py-4",
                "flex items-center gap-4",
                "cursor-pointer transition-colors duration-75 hover:bg-neutral-50",
                selected && "bg-neutral-50"
            )}
            onClick={onClick}
        >
            <Icon className='text-xl' />
            <span className='text-lg capitalize text-gray-900'>{label}</span>
        </li>
    )
}

export default SettingOption

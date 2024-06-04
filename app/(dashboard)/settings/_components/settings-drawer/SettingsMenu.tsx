"use client"

import clsx from "clsx"
import { useState } from "react"

import type { SettingOptions } from "@/app/_types"
import type { IconType } from "react-icons"

// components
import { FaUserCircle } from "react-icons/fa"
import { MdChat } from "react-icons/md"
import SettingOption from "./SettingOption"

const SettingsMenu = () => {
    const [activeMenu, setActiveMenu] = useState<number>(0)

    const openSettingsWindow = (menuIndex: number) => {
        setActiveMenu(menuIndex)
    }

    return (
        <section
            className={clsx(
                "h-screen grow",
                "col-span-full md:col-span-2 lg:col-span-1 ",
                "flex flex-col",
                "border-r-2 border-gray-100"
            )}
        >
            <h3
                className={clsx(
                    "px-4 py-3",
                    "text-xl font-semibold text-neutral-800",
                    "border-b border-gray-100 shadow-sm shadow-zinc-50"
                )}
            >
                Settings
            </h3>

            <div>
                <ul>
                    {settingOptions.map((item, index) => (
                        <SettingOption
                            key={index}
                            {...item}
                            selected={activeMenu === index}
                            onClick={() => openSettingsWindow(index)}
                        />
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default SettingsMenu

type Settings = {
    label: SettingOptions
    icon: IconType
}

const settingOptions: Settings[] = [
    {
        label: "account",
        icon: FaUserCircle,
    },
    {
        label: "chat",
        icon: MdChat,
    },
]

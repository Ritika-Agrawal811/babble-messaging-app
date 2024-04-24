"use client"

import clsx from "clsx"

interface ButtonProps {
    type: "submit" | "reset" | "button"
    fullWidth?: boolean
    children?: React.ReactNode
    onClick?: () => void
    secondary?: boolean
    danger?: boolean
    disabled?: boolean
}

const Button = ({ type, fullWidth, children, onClick, secondary, danger, disabled }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            type={type}
            disabled={disabled}
            className={clsx(
                "mt-6 rounded-md px-4 py-2.5 font-semibold",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                disabled && "pointer-events-none cursor-default opacity-50",
                fullWidth && "w-full",
                secondary ? "text-gray-900" : "text-white",
                danger && "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600",
                !secondary && !danger && "bg-sky-500 hover:bg-sky-600 focus-visible:bg-sky-600"
            )}
        >
            {children}
        </button>
    )
}

export default Button

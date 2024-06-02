"use client"

import clsx from "clsx"

interface ButtonProps {
    type: "submit" | "reset" | "button"
    variant: keyof typeof variants
    fullWidth?: boolean
    children?: React.ReactNode
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
    disabled?: boolean
}

const Button = ({ type, fullWidth, children, onClick, variant, disabled }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            type={type}
            disabled={disabled}
            className={clsx(
                "mt-6 rounded-md px-4 py-2 text-sm font-semibold md:text-base",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                "transition duration-100",
                disabled && "pointer-events-none cursor-default opacity-50",
                fullWidth && "w-full",
                variants[variant]
            )}
        >
            {children}
        </button>
    )
}

export default Button

const variants = {
    primary: "text-white bg-sky-500 hover:bg-sky-600 focus-visible:bg-sky-600",
    secondary: "text-sky-500 border-2 border-gray-300 hover:shadow-md",
    danger: "text-white bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600",
}

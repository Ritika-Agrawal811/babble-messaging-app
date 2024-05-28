"use client"

import clsx from "clsx"
import type { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

interface InputProps {
    id: string
    type?: string
    required?: boolean
    register: UseFormRegister<FieldValues>
    errors: FieldErrors
    disabled?: boolean
    label: string
    showLabel?: boolean
    placeholder?: string
    className?: string
    autocomplete: string
}

const Input = ({
    label,
    id,
    type,
    required,
    register,
    errors,
    disabled,
    placeholder,
    className,
    autocomplete,
    showLabel = true,
}: InputProps) => {
    return (
        <div>
            <label
                htmlFor={id}
                className={clsx("mb-2 text-sm font-medium leading-6 text-gray-900", showLabel ? "block" : "sr-only")}
            >
                {label}
            </label>
            <input
                id={id}
                type={type}
                autoComplete={autocomplete}
                disabled={disabled}
                placeholder={placeholder}
                {...register(id, { required })}
                className={clsx(
                    "form-input block w-full rounded-md border-0 py-2 font-medium shadow-sm placeholder:text-gray-400 sm:leading-6",
                    "ring-1 ring-inset ring-gray-300",
                    "focus:ring-2 focus:ring-inset focus:ring-sky-600",
                    errors[id] && "focus:ring-rose-500",
                    disabled && "pointer-events-none cursor-default opacity-50",
                    className
                )}
            />
        </div>
    )
}

export default Input

"use client"
// clsx helps to handle dynamic classes
import clsx from "clsx"
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

interface InputProps {
    label: string
    id: string
    type?: string
    required?: boolean
    register: UseFormRegister<FieldValues>
    errors: FieldErrors
    disabled?: boolean
}

const Input = ({ label, id, type, required, register, errors, disabled }: InputProps) => {
    return (
        <div>
            <label htmlFor={id} className='block text-sm font-medium leading-6 text-gray-900'>
                {label}
            </label>
            <input
                id={id}
                type={type}
                autoComplete={id}
                disabled={disabled}
                {...register(id, { required })}
                className={clsx(
                    "form-input block w-full rounded-md border-0 mt-2 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 font-medium sm:leading-6",
                    errors[id] && "focus:ring-rose-500",
                    disabled && "opacity-50 cursor-default pointer-events-none"
                )}
            />
        </div>
    )
}

export default Input

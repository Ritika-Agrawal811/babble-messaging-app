"use client"

import axios from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { handleRequestError } from "@/app/_libs/handleRequestError"

import type { FieldValues, SubmitHandler } from "react-hook-form"
import type { User } from "@prisma/client"

// components
import Input from "@/app/_components/inputs/Input"
import Button from "@/app/_components/Button"
import toast from "react-hot-toast"

interface UserDetailsProps {
    user: User
}

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: user?.name || "",
            email: user?.email || "",
        },
    })

    const updateUserDetailsHandler: SubmitHandler<FieldValues> = async (data) => {
        try {
            setIsLoading(true)
            const response = await axios.post("/api/settings/update/userdetails", {
                ...data,
            })

            if (response.status !== 200) throw new Error("Failed to update details")

            toast.success("Your details are successfully updated!")
            router.refresh()
        } catch (error) {
            handleRequestError(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form className='my-10' onSubmit={handleSubmit(updateUserDetailsHandler)}>
            <div className='mb-8 grid gap-6 lg:grid-cols-2'>
                <Input label='Name' id='name' type='text' autocomplete='off' register={register} errors={errors} />
                <Input
                    label='Email'
                    id='email'
                    type='email'
                    autocomplete='off'
                    register={register}
                    errors={errors}
                    disabled={true}
                />
            </div>
            <Button type='submit' variant='primary' disabled={isLoading}>
                Save
            </Button>
        </form>
    )
}

export default UserDetails

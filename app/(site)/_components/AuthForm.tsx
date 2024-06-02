"use client"

import clsx from "clsx"
import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { handleRequestError } from "@/app/_libs/handleRequestError"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import type { FieldValues, SubmitHandler } from "react-hook-form"

// components
import { BsGithub, BsGoogle } from "react-icons/bs"
import Input from "@/app/_components/inputs/Input"
import Button from "@/app/_components/Button"
import AuthSocialButton from "./AuthSocialButton"
import toast from "react-hot-toast"

type Variant = "LOGIN" | "REGISTER"

const AuthForm = () => {
    const [variant, setVariant] = useState<Variant>("LOGIN")
    const [isLoading, setIsLoading] = useState(false)
    const session = useSession()
    const router = useRouter()

    useEffect(() => {
        if (session && session?.status === "authenticated") {
            router.push("/users")
        }
    }, [session, router])

    // initializing react hook form & getting its methods
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: { name: "", email: "", password: "" },
    })

    // a function to handle the submit event of auth form : registration and login functionalities
    const onSubmitHandler: SubmitHandler<FieldValues> = async (data) => {
        try {
            setIsLoading(true)
            if (variant === "REGISTER") {
                const response = await axios.post("/api/register", data)

                if (response.status === 200) signIn("credentials", { ...data })
            }

            if (variant === "LOGIN") {
                const response = await signIn("credentials", {
                    ...data,
                    redirect: false,
                })

                if (response?.error) throw new Error("Invalid credentials")

                toast.success("Succesfully logged in!")
                router.push("/users")
            }
        } catch (error) {
            handleRequestError(error)
        } finally {
            setIsLoading(false)
        }
    }

    // function to handle social login : Github and Google
    const socialLoginHandler = async (action: string) => {
        try {
            setIsLoading(true)
            const response = await signIn(action, { redirect: false })

            if (response?.error) throw new Error("Invalid credentials")

            toast.success("Succesfully logged in!")
        } catch (error) {
            handleRequestError(error)
        } finally {
            setIsLoading(false)
        }
    }

    // a function to toggle between 2 variants of auth form : Login and Register
    const toggleVariantHandler = useCallback(() => {
        variant === "LOGIN" ? setVariant("REGISTER") : setVariant("LOGIN")
    }, [variant])

    return (
        <section
            className={clsx("mx-auto w-11/12 max-w-md ", "mt-10 bg-white shadow sm:rounded-lg", "px-4 py-8 sm:px-10")}
        >
            <form className='space-y-6' onSubmit={handleSubmit(onSubmitHandler)}>
                {variant === "REGISTER" && (
                    <Input
                        id='name'
                        label='Name'
                        register={register}
                        errors={errors}
                        type='text'
                        disabled={isLoading}
                        autocomplete='name'
                    />
                )}

                <Input
                    id='email'
                    label='Email address'
                    type='email'
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                    autocomplete='email'
                />
                <Input
                    id='password'
                    label='Password'
                    type='password'
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                    autocomplete={variant === "LOGIN" ? "current-password" : "new-password"}
                />
                <Button disabled={isLoading} fullWidth type='submit' variant='primary'>
                    {variant === "LOGIN" ? "Sign in" : "Register"}
                </Button>
            </form>

            <div
                className={clsx(
                    "my-4 text-center text-sm font-medium",
                    "relative z-10 before:absolute before:left-0 before:top-1/2 before:-z-10 before:h-[1.5px] before:w-full before:bg-gray-300"
                )}
            >
                <span className='bg-white px-2 text-gray-500'>OR</span>
            </div>

            <div className='flex gap-2'>
                <AuthSocialButton icon={BsGithub} onClick={() => socialLoginHandler("github")} />
                <AuthSocialButton icon={BsGoogle} onClick={() => socialLoginHandler("google")} />
            </div>

            <p className='mt-6 text-center text-sm text-gray-500'>
                {variant === "LOGIN" ? "New to messenger?" : "Already have an account?"}
                <a href='#' className='cursor-pointer font-semibold text-sky-500' onClick={toggleVariantHandler}>
                    {" "}
                    {variant === "LOGIN" ? "Create an account" : "Login"}
                </a>
            </p>
        </section>
    )
}

export default AuthForm

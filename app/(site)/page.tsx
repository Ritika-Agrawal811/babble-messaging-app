import clsx from "clsx"

// components
import Image from "next/image"
import AuthForm from "./_components/AuthForm"

export default function Home() {
    return (
        <main className={clsx("min-h-full bg-gray-100", "flex flex-col justify-center", "py-12 sm:px-6 lg:px-8")}>
            <section className='mx-auto w-full max-w-md'>
                <figure>
                    <Image
                        alt='logo'
                        height={2048}
                        width={2048}
                        className='mx-auto w-12 sm:w-14'
                        src='/images/logo.png'
                    />
                </figure>
                <h2 className='mt-6 text-center text-2xl lg:text-3xl font-medium tracking-tight text-gray-900'>
                    Sign in to your account
                </h2>
            </section>
            <AuthForm />
        </main>
    )
}

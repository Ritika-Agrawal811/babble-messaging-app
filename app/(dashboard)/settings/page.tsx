import clsx from "clsx"
import getCurrentUser from "@/app/_actions/getCurrentUser"

// components
import ProfilePicture from "./_components/account-page/ProfilePicture"
import UserDetails from "./_components/account-page/UserDetails"

export default async function Settings() {
    const currentUser = await getCurrentUser()
    return (
        <main className={clsx("hidden md:block", "col-span-3 h-full lg:col-span-4", "p-6 lg:p-10")}>
            <h2
                className={clsx(
                    "text-2xl font-medium text-gray-900",
                    "relative mb-10",
                    "before:absolute before:left-0 before:top-1/2 before:-z-10 before:h-px before:w-full before:-translate-y-1/2 before:bg-sky-500"
                )}
            >
                <span className='bg-white px-4'>Basic Information</span>
            </h2>
            {currentUser ? (
                <>
                    <ProfilePicture image={currentUser?.image ?? ""} />
                    <UserDetails user={currentUser} />
                </>
            ) : null}
        </main>
    )
}

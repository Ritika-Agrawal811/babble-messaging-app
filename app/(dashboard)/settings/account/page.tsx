import clsx from "clsx"
import getCurrentUser from "@/app/_actions/getCurrentUser"

// components
import ProfilePicture from "../_components/account-page/ProfilePicture"

export default async function Settings() {
    const currentUser = await getCurrentUser()
    return (
        <main className={clsx("hidden md:block", "col-span-3 h-full lg:col-span-4")}>
            <ProfilePicture image={currentUser?.image ?? ""} />
        </main>
    )
}

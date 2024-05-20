import getUsers from "@/app/_libs/getUsers"

// components
import MobileFooter from "@/app/_components/mobile-footer/MobileFooter"
import UsersList from "@/app/_components/users-list/UsersList"

export default async function MobileView() {
    const users = await getUsers()

    return (
        <>
            <div className='col-span-full md:hidden'>
                <UsersList users={users} />
            </div>
            <MobileFooter />
        </>
    )
}

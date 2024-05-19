import clsx from "clsx"

// components
import MobileFooter from "@/app/_components/mobile-footer/MobileFooter"
import DesktopView from "@/app/_components/DesktopView"

export default async function UsersLayout({ children }: { children: React.ReactNode }) {
    return (
        <DesktopView>
            {children}
            <MobileFooter />
        </DesktopView>
    )
}

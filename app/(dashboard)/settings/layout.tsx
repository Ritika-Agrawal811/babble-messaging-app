import clsx from "clsx"

// components
import SettingsMenu from "./_components/settings-drawer/SettingsMenu"

export default async function SettingsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={clsx("grow", "grid grid-cols-5")}>
            <SettingsMenu />
            {children}
        </div>
    )
}

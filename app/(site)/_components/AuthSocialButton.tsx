import clsx from "clsx"
import { IconType } from "react-icons"

interface AuthSocialButtonProps {
    icon: IconType
    onClick: () => void
}

const AuthSocialButton = ({ icon: Icon, onClick }: AuthSocialButtonProps) => {
    return (
        <button
            type='button'
            onClick={onClick}
            className={clsx(
                "w-full rounded-md px-4 py-2.5 text-lg text-gray-500 shadow-sm",
                "inline-flex justify-center",
                "ring-1 ring-inset ring-gray-300",
                "hover:bg-gray-50 focus:outline-offset-0"
            )}
        >
            <Icon />
        </button>
    )
}

export default AuthSocialButton

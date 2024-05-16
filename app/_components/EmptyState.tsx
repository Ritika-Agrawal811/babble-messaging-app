import clsx from "clsx"

const EmptyState = () => {
    return (
        <div className={clsx("h-full bg-gray-100", "flex items-center justify-center")}>
            <h3 className={clsx("text-lg xl:text-xl", "font-semibold text-gray-800")}>
                Select a chat or start a new conversation
            </h3>
        </div>
    )
}

export default EmptyState

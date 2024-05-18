import clsx from "clsx"

const EmptyState = () => {
    return (
        <div className={clsx("h-full bg-gray-100", "flex items-center justify-center")}>
            <h3 className={clsx("xl:text-lg", "text-gray-800")}>Select a chat or start a new conversation</h3>
        </div>
    )
}

export default EmptyState

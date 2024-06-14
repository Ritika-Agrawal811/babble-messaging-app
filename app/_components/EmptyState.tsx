import clsx from "clsx"

interface EmptyStateProps {
    content: string
}

const EmptyState: React.FC<EmptyStateProps> = ({ content }) => {
    return (
        <div className={clsx("h-full bg-gray-100", "flex items-center justify-center")}>
            <h3 className={clsx("xl:text-lg", "text-gray-800")}>{content}</h3>
        </div>
    )
}

export default EmptyState

import clsx from "clsx"

interface TooltipProps {
    label: string
    position: "left" | "right" | "top" | "bottom"
}

const Tooltip: React.FC<TooltipProps> = ({ label, position }) => {
    return (
        <span
            className={clsx(
                "absolute z-50 whitespace-nowrap rounded-md bg-white text-gray-500 shadow",
                "px-2.5 py-1.5",
                "text-sm",
                "hidden group-hover:block",
                positions[position]
            )}
        >
            {label}
        </span>
    )
}

export default Tooltip

const positions = {
    left: "-left-1 top-1/2 -translate-y-1/2",
    right: "left-[calc(100%+0.5em)] top-1/2 -translate-y-1/2",
    top: "",
    bottom: "",
}

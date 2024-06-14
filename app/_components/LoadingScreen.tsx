import clsx from "clsx"

const LoadingScreen = () => {
    return (
        <div className={clsx("fixed inset-0 z-50", "bg-white bg-opacity-60", "flex items-center justify-center")}>
            <div className='shrink-and-rotate relative h-12 w-12'>
                {dots.map((item, index) => {
                    const { color, position } = item
                    return (
                        <span
                            key={index}
                            className={clsx(`absolute ${position}`, "h-4 w-4", `inline-block rounded-full ${color}`)}
                        ></span>
                    )
                })}
            </div>
        </div>
    )
}

export default LoadingScreen

const dots = [
    {
        color: "bg-sky-500",
        position: "-left-2 -top-2",
    },
    {
        color: "bg-sky-600",
        position: "-right-2 -top-2",
    },
    {
        color: "bg-sky-400",
        position: "-left-2 -bottom-2",
    },
    {
        color: "bg-sky-300",
        position: "-right-2 -bottom-2",
    },
]

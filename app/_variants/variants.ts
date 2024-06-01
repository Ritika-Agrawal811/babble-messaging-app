export const slideIn = {
    initial: {
        x: "100%",
        transition: {
            duration: 0.3,
        },
    },
    animate: {
        x: 0,
        transition: {
            duration: 0.3,
            ease: "easeInOut",
        },
    },
}

export const fadeIn = {
    initial: {
        opacity: 0,
        transition: {
            duration: 0.3,
        },
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.3,
        },
    },
}

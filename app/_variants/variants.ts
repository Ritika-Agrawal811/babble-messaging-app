// Slide animation variants

export const slideInRight = {
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

export const slideInLeft = {
    initial: {
        x: "-100%",
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

export const slideInLeftHalf = {
    initial: {
        x: "-100%",
        transition: {
            duration: 0.3,
        },
    },
    animate: {
        x: "-50%",
        transition: {
            duration: 0.3,
            ease: "easeInOut",
        },
    },
}

export const slideOutRightHalf = {
    initial: {
        x: "-50%",
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

// fade animation variants

export const fadeIn = {
    initial: {
        opacity: 0,
        transition: {
            duration: 0.2,
        },
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.2,
        },
    },
}

"use client"

import clsx from "clsx"
import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { fadeIn } from "@/app/_variants/variants"

// components
import { IoClose } from "react-icons/io5"

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={clsx("fixed inset-0 z-50", "flex items-center justify-center", "cursor-pointer")}
                    initial='initial'
                    animate='animate'
                    exit='initial'
                    onClick={onClose}
                >
                    {/* backdrop */}
                    <motion.div
                        className={clsx("absolute inset-0 -z-10", "bg-gray-700 bg-opacity-40")}
                        variants={fadeIn}
                    ></motion.div>

                    {/* modal dialog */}
                    <motion.section
                        className={clsx("mx-2 w-full sm:max-w-md", "relative bg-white p-4 shadow-md")}
                        variants={fadeIn}
                    >
                        <button
                            className={clsx(
                                "absolute right-4 top-4",
                                "rounded-md text-gray-400 hover:text-gray-500",
                                "focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                            )}
                            onClick={onClose}
                        >
                            <span className='sr-only'>Close</span>
                            <IoClose className='text-2xl' />
                        </button>

                        {children}
                    </motion.section>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Modal

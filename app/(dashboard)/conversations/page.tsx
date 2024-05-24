"use client"

import clsx from "clsx"
import useConversation from "@/app/_hooks/useConversation"

// components
import EmptyState from "@/app/_components/EmptyState"

export default function Conversations() {
    const { isOpen } = useConversation()

    console.log("isOpen is", isOpen)
    return (
        <main className={clsx("hidden md:block", "col-span-3 h-full lg:col-span-4")}>
            <EmptyState />
        </main>
    )
}

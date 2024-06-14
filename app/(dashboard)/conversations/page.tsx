"use client"

import clsx from "clsx"

// components
import EmptyState from "@/app/_components/EmptyState"

export default function Conversations() {
    return (
        <main className={clsx("hidden md:block", "col-span-3 h-full xl:col-span-4")}>
            <EmptyState content='Select a chat to continue with the conversation' />
        </main>
    )
}

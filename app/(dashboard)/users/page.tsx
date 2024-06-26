"use client"

import clsx from "clsx"

// components
import EmptyState from "@/app/_components/EmptyState"

export default function Users() {
    return (
        <main className={clsx("hidden md:block", "col-span-3 h-full lg:col-span-4")}>
            <EmptyState content='Select a chat to start a new conversation' />
        </main>
    )
}

"use client"

import clsx from "clsx"
import { signOut } from "next-auth/react"

// components
import EmptyState from "../_components/EmptyState"

export default function Users() {
    return (
        <main className='h-full'>
            <section className={clsx("hidden lg:block", "h-full pl-80")}>
                <EmptyState />
            </section>
        </main>
    )
}

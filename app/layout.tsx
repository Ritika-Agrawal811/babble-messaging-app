import type { Metadata } from "next"
import { Inter } from "next/font/google"
import ToasterContext from "./_context/ToasterContext"
import AuthContext from "./_context/AuthContext"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Messenger Clone",
    description: "messenger clone",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <AuthContext>
                    <ToasterContext />
                    {children}
                </AuthContext>
            </body>
        </html>
    )
}

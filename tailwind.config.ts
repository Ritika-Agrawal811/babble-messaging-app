import type { Config } from "tailwindcss"

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [
        // importing plugin @tailwindcss/forms to use in the form fields
        require("@tailwindcss/forms")({
            strategy: "class",
        }),
    ],
}
export default config

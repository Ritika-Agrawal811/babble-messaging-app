import { withAuth } from "next-auth/middleware"

export default withAuth({
    pages: {
        signIn: "/",
    },
})

export const config = {
    matcher: ["/users/:path*"],
}

// a middleware to protect the users pages - pages we want to protect are mentioned in the config object inside matcher array.
// pages object is used to define custom page for signIn. Here we can define custom pages for error, signOut, newUser etc.

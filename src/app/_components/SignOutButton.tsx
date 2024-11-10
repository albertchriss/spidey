import { signOut } from "~/server/auth"

export const SignOutButton = () => {
    return (
        <form action={async () => {
            "use server"
            await signOut({redirectTo: "/"})
        }}>
            <button type="submit">Sign Out</button>
        </form>
    )
}
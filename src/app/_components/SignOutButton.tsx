"use client"
import { signOut } from "next-auth/react"
import { Button } from "~/components/ui/button"

export const SignOutButton = () => {
    const onClick = () => {
        signOut({
            callbackUrl: "/"
        })
    }
    return (
        <Button size="lg" onClick={() => onClick()}>Sign Out</Button>
    )
}
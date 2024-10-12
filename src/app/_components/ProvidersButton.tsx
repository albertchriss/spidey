"use client"

import { Button } from "~/components/ui/button";
import { signIn } from "next-auth/react"

interface ProvidersButtonProps {
    provider: string;
}
export const ProvidersButton = ({provider} : ProvidersButtonProps) => {
    const onClick = (provider: string) => {
        signIn(provider, {
            callbackUrl: "/calendar"
        })
    }
    return (
        <Button size="lg" onClick={() => onClick(provider)}>Sign In</Button>
    )
}
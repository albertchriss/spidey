import Link from "next/link"
import { Button } from "~/components/ui/button"

export const CreateButton = () => {
    return (
        <Link href="/create" className="absolute right-[2%] bottom-[2%] flex items-center justify-center">
            <Button className="rounded-full size-12 text-4xl flex items-center justify-center">
                <p>
                    +
                </p>
            </Button>
        </Link>
    )
}
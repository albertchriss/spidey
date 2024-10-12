"use client";
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "~/components/ui/button"
import { IoMenuOutline } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";

const navLinks = [
    {
        name: "Calendar",
        route: "/calendar"
    },
    {
        name: "Task",
        route: "/tasklist"
    }
]

export const Navbar = () => {
    const pathname = usePathname();

    const [menuOpen, setMenuOpen] = useState(false)

    const menuRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return(
        <div className="sticky inset-0 w-full h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2">
            <div className="h-full flex items-center justify-between gap-2 mx-auto px-5 py-2">
                <Link href="/calendar" className="flex gap-2 items-center">
                    <p>Home</p>
                </Link>
                
                <nav className="hidden md:flex gap-8">
                    {navLinks.map((route) => (
                        <Link key={route.name} href={route.route} className={`
                            ${pathname == route.route 
                            ? "text-black"
                            : "text-gray-400 hover:text-gray-700"
                        }`}>
                            {route.name}
                        </Link>
                    ))}
                </nav>
                
                <div className="block md:hidden hover:cursor-pointer">
                    <Button variant="outline" onClick={() => setMenuOpen(!menuOpen)}>
                        <IoMenuOutline />
                    </Button>
                </div>

            </div>
            <nav ref={menuRef} className={`md:hidden flex flex-col justify-center transition-max-height
                ${ menuOpen ? "max-h-60" : "max-h-0" }
            `}>
                {navLinks.map((route) => (
                    <Link key={route.name} href={route.route} onClick={() => setMenuOpen(false)} className={`
                        ${pathname == route.route 
                        ? "text-black"
                        : "text-gray-400"
                    }`}>
                        {route.name}
                    </Link>
                ))}
            </nav>

        </div>
    )
}
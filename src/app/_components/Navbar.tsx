"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "~/components/ui/button";
import { IoMenuOutline } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { DropdownProfile } from "./DropdownProfile";

const navLinks = [
  {
    name: "Calendar",
    route: "/calendar",
  },
  {
    name: "Task",
    route: "/tasklist",
  },
];

interface NavbarProps {
  src: string;
  email: string;
}

export const Navbar = ({ src, email }: NavbarProps) => {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);

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

  return (
    <div className="fixed top-0 z-30 h-fit w-full border-b border-zinc-300 bg-zinc-100">
      <div className="flex h-full w-full items-center justify-between gap-2 px-10 py-2">
        <DropdownProfile src={src} email={email}/>
        <div className="my-auto">
          <nav className="hidden gap-10 md:flex">
            {navLinks.map((route) => (
              <Link
                key={route.name}
                href={route.route}
                className={`relative ${
                  pathname == route.route
                    ? "text-black"
                    : "text-gray-400 hover:text-gray-700"
                }`}
              >
                {route.name}
              </Link>
            ))}
          </nav>

          <div className="block hover:cursor-pointer md:hidden">
            <Button variant="outline" onClick={() => setMenuOpen(!menuOpen)}>
              <IoMenuOutline />
            </Button>
          </div>
        </div>
      </div>
      <nav
        ref={menuRef}
        className={`transition-max-height flex w-full flex-col justify-center overflow-hidden bg-gray-200 duration-500 md:hidden ${menuOpen ? "max-h-60" : "max-h-0"} `}
      >
        {navLinks.map((route) => (
          <Link
            key={route.name}
            href={route.route}
            onClick={() => setMenuOpen(false)}
            className={`w-full py-2 text-center ${
              pathname == route.route ? "text-black" : "text-gray-400"
            }`}
          >
            {route.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

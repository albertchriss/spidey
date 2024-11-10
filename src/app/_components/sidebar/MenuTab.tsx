"use client"
import Link from "next/link";
import { IoCalendar } from "react-icons/io5";
import { FaTasks } from "react-icons/fa";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";
import { usePathname } from "next/navigation";
const navLinks = [
  {
    name: "Calendar",
    route: "/calendar",
    icon: IoCalendar,
  },
  {
    name: "Task",
    route: "/tasklist",
    icon: FaTasks,
  },
];
export const MenuTab = () => {
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {navLinks.map((route, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton asChild  className={`${route.route === pathname ? "bg-gray-200 hover:bg-gray-300" : ""}`}>
                <Link href={route.route} className="gap-4">
                  <route.icon />
                  <span className="">{route.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

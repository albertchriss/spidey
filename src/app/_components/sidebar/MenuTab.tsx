import Link from "next/link";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { FaTasks } from "react-icons/fa";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";
const navLinks = [
  {
    name: "Calendar",
    route: "/calendar",
    icon: ChevronDownIcon,
  },
  {
    name: "Task",
    route: "/tasklist",
    icon: FaTasks,
  },
];
export const MenuTab = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {navLinks.map((route, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton asChild>
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

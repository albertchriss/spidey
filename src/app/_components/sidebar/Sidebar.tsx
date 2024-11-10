
import Image from "next/image";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "~/components/ui/sidebar";
import { DropdownProfile } from "./DropdownProfile";
import { MenuTab } from "./MenuTab";



interface AppSidebarProps {
  src: string;
  email: string;
}

export const AppSidebar = ({ src, email }: AppSidebarProps) => {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownProfile src={src} email={email} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <MenuTab />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/tasklist" className="flex items-center justify-center gap-5">
              <h1 className="font-bold text-xl">Spidey</h1>
              <Image
                src="/spidey.png"
                alt="profile-pic"
                width={100}
                height={100}
                className="w-16 h-auto"
              />
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

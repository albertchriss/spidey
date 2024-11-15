
import Image from "next/image";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from "~/components/ui/sidebar";
import { DropdownProfile } from "./DropdownProfile";
import { MenuTab } from "./MenuTab";
import { CreateTab } from "./CreateTab";


interface AppSidebarProps {
  src: string;
  email: string;
  userId: string;
}

export const AppSidebar = ({ src, email, userId }: AppSidebarProps) => {
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
        <CreateTab userId={userId} />
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

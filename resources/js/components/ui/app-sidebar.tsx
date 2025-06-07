import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"
import { SharedData } from "@/types"
import { NavDocuments } from "./nav-documents"
import { NavMain } from "./nav-main"
import { NavSecondary } from ".//nav-secondary"
import { NavUser } from "./nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./fragments/sidebar"
import { Link, useForm, usePage } from "@inertiajs/react"
import { useInitials } from "@/hooks/use-initials"
import { Separator } from "./fragments/separator"
import AppLogoIcon from "./app-logo-icon"
import { Box, FileBox, HardHat, Package, Users2 } from "lucide-react"



type ProfileForm = {
    name: string;
    email: string;
    team_id: number
}

  

   


const datas = {

  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard/admind",
      icon: IconDashboard,
    },
    {
      title: "Elections",
      url: "/dashboard/elections",
      icon:  IconListDetails,
    },
    {
      title: "Candidate",
      url: "/dashboard/candidate",
      icon:  Users2,
    },
    {
      title: "Adminds",
      url: "/dashboard/users",
      icon:  HardHat,
    },
    // {
    //   title: "Lifecycle",
    //   url: "#",
    //   icon: IconListDetails,
    // },
    // {
    //   title: "Analytics",
    //   url: "#",
    //   icon: IconChartBar,
    // },
    // {
    //   title: "Projects",
    //   url: "#",
    //   icon: IconFolder,
    // },
    // {
    //   title: "Team",
    //   url: "#",
    //   icon: IconUsers,
    // },
  ],
 
  navSecondary: [
    {
      title: "Settings",
      url: "/settings/profile",
      icon: IconSettings,
    },
   
  ],

}
const datass = {

  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard/admind",
      icon: IconDashboard,
    },
    {
      title: "Elections",
      url: "/dashboard/elections",
      icon:  IconListDetails,
    },
    {
      title: "Candidate",
      url: "/dashboard/candidate",
      icon:  Users2,
    },
    // {
    //   title: "Adminds",
    //   url: "/dashboard/users",
    //   icon:  HardHat,
    // },
    // {
    //   title: "Lifecycle",
    //   url: "#",
    //   icon: IconListDetails,
    // },
    // {
    //   title: "Analytics",
    //   url: "#",
    //   icon: IconChartBar,
    // },
    // {
    //   title: "Projects",
    //   url: "#",
    //   icon: IconFolder,
    // },
    // {
    //   title: "Team",
    //   url: "#",
    //   icon: IconUsers,
    // },
  ],
 
  navSecondary: [
    {
      title: "Settings",
      url: "/settings/profile",
      icon: IconSettings,
    },
   
  ],

}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
     const page = usePage<SharedData>();
    const { auth } = page.props;
 const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<Required<ProfileForm>>({
        name: auth.user.name,
        email: auth.user.email,
        team_id: auth.user.team_id
    });


  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="flex flex-col gap-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
            asChild 
              className="data-[slot=sidebar-menu-button]:!p-1.5 space-x-1"
            >
      
            <Link href="/dashboard/admind" className="flex h-9 w-9 items-center justify-center">
                   <div   className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                 <Package className="size-5 text-accent" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                 
                <span className="text-base font-semibold">Electioneering.</span>
            </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      {/* <Separator /> */}
      </SidebarHeader>
      <SidebarContent>
        
        <NavMain items={data.team_id == null ? datas.navMain :  datass.navMain } />
        {/* <NavDocuments items={data.documents} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={auth} />
      </SidebarFooter>
    </Sidebar>
  )
}

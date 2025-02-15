"use client"
import { Project, User } from "@/db/schema";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import RecentOpen from "@/components/global/app-sidebar/recent-open";
import NavFooter from "@/components/global/app-sidebar/nav-footer";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import NavMain from "@/components/global/app-sidebar/nav-main";

import { data } from "@/lib/constants";
import { InferSelectModel } from "drizzle-orm";


type ProjectType = InferSelectModel<typeof Project>
type UserType = InferSelectModel<typeof User>


const AppSidebar = ({
  recentProjects,
  user,
  ...props
}: { recentProjects: ProjectType[] } & {
  user: UserType;
} & React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar
      collapsible="icon"
      className="max-w-[212px] bg-primary-foreground"
      {...props}
    >
      <SidebarHeader className="pt-6 px-2 pb-0">
        <SidebarMenuButton
          size={"lg"}
          className="data-[state=open]:text-sidebar-accent-foreground gap-5"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
            <Avatar className="h-10 w-10 rounded-full">
              <AvatarImage src={"/logo.png"} alt={"logo"} />
            </Avatar>
          </div>
          <span className="truncate text-primary text-xl font-semibold">
            VizboardAI
          </span>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent className="px-2 mt-10 gap-y-6">
        <NavMain items={data.navMain}/>
        <RecentOpen recentProjects={recentProjects || []}/>
      </SidebarContent>
      <SidebarFooter >
        <NavFooter drizzleUser={user}/>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;

import { getRecentProjects } from "@/actions/project";
import { onAuthenticateUser } from "@/actions/user";
import AppSidebar from "@/components/global/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const recentProjects = await getRecentProjects();
  const checkUser = await onAuthenticateUser();
  if (!checkUser.user) {
    redirect("/sign-in");
  }
  return(
  <SidebarProvider>
    {/* <AppSidebar
      user={checkUser.user}
      recentProjects={recentProjects.data || []}
    /> */}
    {children}
  </SidebarProvider>)
};

export default Layout;

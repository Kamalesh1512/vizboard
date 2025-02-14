'use client'
import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Project } from "@/db/schema";
import { useToast } from "@/hooks/use-toast";
import { useSlideStore } from "@/store/useSlideStore";
import { InferSelectModel } from "drizzle-orm";
import { useRouter } from "next/navigation";
import React from "react";

type ProjectType = InferSelectModel<typeof Project>;

interface RecentOpenProps {
  recentProjects: ProjectType[];
}

const RecentOpen = ({ recentProjects }: RecentOpenProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const { setSlides } = useSlideStore();
  const handleClick = (projectId: string, slides: any) => {
    if (!projectId || !slides) {
      toast({
        description: "Projects Not Found",
        variant: "destructive",
      });
      return;
    }
    setSlides(JSON.parse(JSON.stringify(slides)));
  };
  return recentProjects.length > 0 ? (
    <SidebarGroup>
      <SidebarGroupLabel>Recently Opened</SidebarGroupLabel>
      <SidebarMenu>
        {recentProjects.length > 0 ? (
          recentProjects.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className={`hove:bg-primary-80`}
              >
                <Button
                  variant={"link"}
                  onClick={() => handleClick(item.id, item.slides)}
                  className={`text-xs items-center justify-start`}
                >
                  <span>{item.title}</span>
                </Button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))
        ) : (
          <></>
        )}
      </SidebarMenu>
    </SidebarGroup>
  ) : (
    <></>
  );
};

export default RecentOpen;

"use client";
import { Button } from "@/components/ui/button";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { User } from "@/db/schema";
import { useUser } from "@clerk/nextjs";
import { InferSelectModel } from "drizzle-orm";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type UserType = InferSelectModel<typeof User>;

const NavFooter = ({ drizzleUser }: { drizzleUser: UserType }) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex flex-col gap-y-6 items-start group-data-[collapsible=icon]:hidden">
          {!drizzleUser.subscription && (
            <div className="flex flex-col items-start p-2 ob-3 gap-4 bg-background-80">
              <div className="flex flex-col items-start gap-1">
                <p className="text-base font-bold">
                  Get <span className="text-vivid">Creative AI</span>
                </p>
                <span className="text-sm dark:text-muted-foreground">
                  Unlock all features including AI and more
                </span>
              </div>
              <div className="w-full bg-vivid-gradient p-[1px] rounded-full">
                <Button 
                className="w-ful border-vivid bg-background-80 hover:bg-background-90 text-primary rounded-full font-bold"
                variant={'default'}
                size={'lg'}
                // onClick={handleUpgrade}
                >
                    {loading?'Upgrading...':'Upgrade'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default NavFooter;

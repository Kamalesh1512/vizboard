"use client";
import { buySubscription } from "@/actions/payments";
import { Button } from "@/components/ui/button";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { User } from "@/db/schema";
import { useModal } from "@/hooks/use-modal";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import { InferSelectModel } from "drizzle-orm";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type UserType = InferSelectModel<typeof User>;

const NavFooter = ({ drizzleUser }: { drizzleUser: UserType }) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const subscriptionsPlans = useModal();

  const isSubscribed = drizzleUser.subscription;

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex flex-col gap-y-6 items-start group-data-[collapsible=icon]:hidden">
          {!drizzleUser.subscription && (
            <div className="flex flex-col items-start p-2 pb-3 gap-4 bg-primary-foreground rounded-xl">
              <div className="flex flex-col items-start gap-1">
                <p className="text-base font-bold">
                  Get <span className="text-vivid">Pro</span>
                </p>
                <span className="text-sm dark:text-muted-foreground">
                  Unlock all features including AI and more
                </span>
              </div>
              <div className="w-full bg-vivid-gradient p-[1px] rounded-full">
                {!isSubscribed ? (
                  <Button
                    className="w-full border-vivid bg-primary-foreground hover:bg-primary-foreground text-primary rounded-full font-bold"
                    variant={"outline"}
                    size={"lg"}
                    onClick={subscriptionsPlans.onOpen}
                  >
                    Upgrade
                  </Button>
                ) : (
                  <></>
                )}
              </div>
            </div>
          )}
          <SignedIn>
            <SidebarMenuButton
              size={"lg"}
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <UserButton />
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-semibold">{user?.fullName}</span>
                <span className="truncate text-muted-foreground">
                  {user?.emailAddresses[0].emailAddress}
                </span>
              </div>
            </SidebarMenuButton>
          </SignedIn>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default NavFooter;

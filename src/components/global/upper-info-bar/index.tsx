import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import SearchBar from "@/components/global/upper-info-bar/upper-info-searchbar";
import { User } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import React from "react";
import ThemeSwitcher from "@/components/global/mode-toggle";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import NewProjectButton from "@/components/global/upper-info-bar/new-project-button";

type UserType = InferSelectModel<typeof User>;

interface UpperInfoBarProps {
  user: UserType;
}

const UpperInfoBar = ({ user }: UpperInfoBarProps) => {
  return (
    <header className="sticky top-0 z-[10] flex shrink-0 flex-wrap items-center gap-2 bg-background p-4 justify-between">
      <SidebarTrigger className="ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <div className="w-full max-w-[95%] flex items-center justify-between gap-4 flex-wrap">
        <SearchBar />
        <ThemeSwitcher />
        <div className="flex flex-wrap gap-4 items-center justify-end">
            <Button className="bg-primary/15 rounded-lg hover:bg-background/80 text-primary font-semibold cursor-not-allowed">
            <Upload/>
            Import
            </Button>
            <NewProjectButton user={user}/>
        </div>
      </div>
    </header>
  );
};

export default UpperInfoBar;

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useSlideStore } from "@/store/useSlideStore";
import { Home, Play, PlayIcon, Share2Icon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

interface NavBarProps {
  presentationId: string;
}

const NavBar = ({ presentationId }: NavBarProps) => {
  const {toast}  = useToast();
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const { currentTheme,project } = useSlideStore();

  const handleCopy = () =>{
    navigator.clipboard.writeText(`${window.location.origin}/share/${presentationId}`)
    toast({
        variant:'default',
        description:'Link has been copied'
    })
  }
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 w-full h-20 flex justify-between items-center py-4 px-7 border-b"
      style={{
        backgroundColor:
          currentTheme.navbarColor || currentTheme.backgroundColor,
        color: currentTheme.accentColor,
      }}
    >
      <Link href={"/dashboard"} passHref>
        <Button
          variant={"outline"}
          style={{ backgroundColor: currentTheme.backgroundColor }}
        >
          <Home className="w-4 h-4" />
          <span className="hidden sm:inline">Return Home</span>
        </Button>
      </Link>
      <Link
        href={"/presentation/template-market"}
        className="text-lg font-semibold hidden sm:block"
      >{project?.title}</Link>
      <div className="flex items-center gap-4">
        <Button 
        variant={'outline'}
        style={{backgroundColor:currentTheme.backgroundColor}}
        onClick={handleCopy}>
            <Share2Icon className="w-4 h-4"/>
        </Button>
        {/* {WIP} sell template */}
        <Button 
        variant={'default'}
        className="flex items-center gap-2"
        onClick={()=> setIsPresentationMode(true)}>
            <PlayIcon className="w-4 h-4"/>
            <span className="hidden sm:inline">Present</span>
        </Button>
      </div>
      {/* add presentation mode */}
      {/* {isPresentationMode && <PresentationMode/>} */}
    </nav>
  );
};

export default NavBar;

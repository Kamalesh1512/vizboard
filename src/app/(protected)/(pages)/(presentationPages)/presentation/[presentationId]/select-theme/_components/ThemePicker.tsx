import { generateLayouts } from "@/actions/genai";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Theme } from "@/lib/types";
import { useSlideStore } from "@/store/useSlideStore";
import { Loader2, Wand2 } from "lucide-react";
import {motion} from 'framer-motion'
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

interface ThemePickerProps {
  selectedTheme: Theme;
  themes: Theme[];
  onThemeSelect: (theme: Theme) => void;
}

const ThemePicker = ({
  onThemeSelect,
  selectedTheme,
  themes,
}: ThemePickerProps) => {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const { project, currentTheme, setSlides } = useSlideStore();
  const [Loading, setLoading] = useState(false);

  const handleGenerateLayouts = async () => {
    setLoading(true);
    if (!selectedTheme) {
      toast({
        variant: "destructive",
        description: "Please select a theme",
      });
    }
    if (project?.id === "") {
      toast({
        variant: "destructive",
        description: "Please create a project",
      });
      router.push("/create-page");
    }
    try {
      const response = await generateLayouts(
        params.presentationId as string,
        currentTheme.name
      );
      if (response?.status !== 200 && !response?.data) {
        throw new Error("Layout generation failed");
      }else{
        toast({
          variant: "default",
          description: "Layouts generated successfully",
        });
        setSlides(response.data);
        router.push(`/presentation/${project?.id}`);

      }

    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to generate layouts",
      });
    }finally{
      setLoading(false)
    }
  };
  return (
    <div
      className="w-[400px] overflow-hidden sticky top-0 h-screen flex flex-col"
      style={{
        backgroundColor:
          selectedTheme.sidebarColor || selectedTheme.backgroundColor,
        borderLeft: `1px solid ${selectedTheme.accentColor}20`,
      }}
    >
      <div className="p-8 space-y-6 flex-shrink-0">
        <div className="space-y-2">
          <h2
            className="text-3xl font-bold tracking-tight"
            style={{ color: selectedTheme.accentColor }}
          >
            Pick a theme
          </h2>
          <p
            className="text-sm"
            style={{ color: `${selectedTheme.accentColor}80` }}
          >
            Choose from our curated collection or generate a custom theme
          </p>
        </div>
        <Button
          className="w-full h-12 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          style={{
            backgroundColor: selectedTheme.accentColor,
            color: selectedTheme.backgroundColor,
          }}
          onClick={handleGenerateLayouts}
        >
          {Loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              <p className="animate-pulse"> Generating...</p>{" "}
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-5 w-5" />
              <p className="items-center">Generate Theme</p>
            </>
          )}
        </Button>
      </div>
      <ScrollArea className="flex-grow px-8 pb-8">
        <div className="grid grid-cols-1 gap-4">
          {themes.map((theme)=>(
            <motion.div key={theme.name}
            whileHover={{scale:1.02}}
            whileTap={{scale:0.98}}>
              <Button
              onClick={()=>{onThemeSelect(theme)}}
              className="flex flex-col items-center justify-start p-6 w-full h-auto"
              style={{
                fontFamily:theme.fontFamily,
                color:theme.fontColor,
                background:theme.gradientBackground || theme.backgroundColor
              }}>
                <div className="w-full flex items-center justify-between">
                  <span className="text-xl font-bold">{theme.name}</span>
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor:theme.accentColor}}/>
                  </div>
                  <div className="space-y-1 w-full">
                    <div className="text-2xl font-bold"
                    style={{color:theme.accentColor}}>
                      Title
                    </div>
                  </div>
                  <div className="text-base opacity-80">
                    Body & {' '}
                    <span style={{color: theme.accentColor}}>link</span>
                  </div>
              </Button>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ThemePicker;

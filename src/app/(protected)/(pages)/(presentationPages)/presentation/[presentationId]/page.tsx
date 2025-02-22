"use client";
import { getProjectById } from "@/actions/project";
import { useToast } from "@/hooks/use-toast";
import { themes } from "@/lib/constants";
import { useSlideStore } from "@/store/useSlideStore";
import { Loader2Icon } from "lucide-react";
import { useTheme } from "next-themes";
import { redirect, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import NavBar from "./_components/Navbar/NavBar";
import LayoutPreview from "./_components/editor-sidebar/left-sidebar/LayoutPreview";
import Editor from "@/app/(protected)/(pages)/(presentationPages)/presentation/[presentationId]/_components/editor/Editor";

type Props = {};

const Page = (props: Props) => {
  const params = useParams();
  const { toast } = useToast();
  const { setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const { slides, setSlides, currentTheme, setCurrentTheme, setProject } =
    useSlideStore();

  useEffect(() => {
    (async () => {
      try {
        const response = await getProjectById(params.presentationId as string);
        if (response.status !== 200 || !response.data) {
          toast({
            variant: "destructive",
            description: "Unable to fetch project",
          });
          redirect("/dashboard");
        }
        const findTheme = themes.find(
          (theme) => theme.name === response.data.themeName
        );
        setCurrentTheme(findTheme || themes[0]);
        setTheme(findTheme?.type === "dark" ? "dark" : "light");
        setProject(response.data);
        setSlides(JSON.parse(JSON.stringify(response.data.slides)));
      } catch (error) {
        toast({
          variant: "destructive",
          description: "An unexpected error occured",
        });
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2Icon className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }
  //presentation editor page
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen flex flex-col">
        <NavBar presentationId={params.presentationId as string} />
        <div
          className="flex-1 flex overflow-hidden pt-16"
          style={{
            color: currentTheme.accentColor,
            fontFamily: currentTheme.fontFamily,
            backgroundColor: currentTheme.backgroundColor,
          }}
        >
          <LayoutPreview />
          <div className="flex-1 ml-64 pr-16">
            <Editor isEditable={true} />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};
export default Page;

"use client";
import { getProjectById } from "@/actions/project";
import { useToast } from "@/hooks/use-toast";
import { themes } from "@/lib/constants";
import { useSlideStore } from "@/store/useSlideStore";
import { Loader2Icon } from "lucide-react";
import { useTheme } from "next-themes";
import { redirect, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {DndProvider} from 'react-dnd'

type Props = {}

export const page = (props:Props) => {
  const params = useParams();
  const {toast} = useToast()
  const { setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const { slides, setSlides, currentTheme, setCurrentTheme,setProject } = useSlideStore();

  useEffect(() => {
    (async () => {
      try {
        const response = await getProjectById(params.presentationId as string)
        if (response.status!==200 || !response.data) {
            toast({
                variant:'destructive',
                description:'Unable to fetch project',
            })
            redirect('/dashboard')
        }
        const findTheme = themes.find((theme)=> theme.name === response.data.themeName)
        setCurrentTheme(findTheme || themes[0])
        setTheme(findTheme?.type === 'dark'? 'dark':'light')
        setProject(response.data)
        setSlides(JSON.parse(JSON.stringify(response.data.slides)))


      } catch (error) {
        toast({
            variant:'destructive',
            description:'An unexpected error occured',
        })
      }finally{
        setIsLoading(false)
      }
    })();
  }, []);
  if (isLoading) {
    return (<div className="flex items-center justify-center h-screen">
        <Loader2Icon className="w-8 h-8 animate-spin text-primary"/>
    </div>)
  }
  //wip presentation page
//   return <DndProvider></DndProvider>;
};

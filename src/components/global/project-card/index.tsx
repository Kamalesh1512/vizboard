"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { itemVariants, themes } from "@/lib/constants";
import { useSlideStore } from "@/store/useSlideStore";
import { useRouter } from "next/navigation";
import ThumbnailPreview from "./thumbnail-preview";
import { timeAgo } from "@/lib/utils";
import AlertDialogBox from "../alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { deleteProject, recoverProject } from "@/actions/project";
interface ProjectCardProps {
  projectId: string;
  title: string;
  createdAt: Date | null;
  isDelete: boolean | null;
  slideData: JSON;
  themeName: string | null;
}

const ProjectCard = ({
  projectId,
  title,
  createdAt,
  isDelete,
  slideData,
  themeName,
}: ProjectCardProps) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { setSlides } = useSlideStore();
  const router = useRouter();
  const { toast } = useToast();

  const handleNavigation = () => {
    setSlides(JSON.parse(JSON.stringify(slideData)));
    router.push(`/presentation/${projectId}`);
  };

  const theme = themes.find((theme) => theme.name === themeName) || themes[0];

  const handleRecover = async () => {
    setLoading(true);
    if (!projectId) {
      setLoading(false);
      toast({
        variant: "destructive",
        description: "Error Project not found",
      });
    }
    try {
      const response = await recoverProject(projectId);
      if (response.status !== 200) {
        toast({
            variant: "destructive",
            description: 'Failed to recover project',
          });
      }
      setOpen(false)
      router.refresh()
      toast({
        variant: "default",
        description: "Project recovered sucessfully",
      });
    } catch (error) {
        console.log(error)
        toast({
            variant: "destructive",
            description: 'Failed to recover project',
          });
    }
  };

  const handleDelete = async () =>{
    setLoading(true);
    if (!projectId) {
      setLoading(false);
      toast({
        variant: "destructive",
        description: "Error Project not found",
      });
    }
    try {
      const response = await deleteProject(projectId);
      if (response.status !== 200) {
        toast({
            variant: "destructive",
            description: 'Failed to delete project',
          });
      }
      setOpen(false)
      router.refresh()
      toast({
        variant: "default",
        description: "Project deleted sucessfully",
      });
    } catch (error) {
        console.log(error)
        toast({
            variant: "destructive",
            description: 'Failed to delete project',
          });
    }
  };
  

  return (
    <div>
      <motion.div
        className={`group w-full flex flex-col gap-y-3 rounded-xl p-3 transition-colors ${
          !isDelete && "hover:bg-muted/50"
        }`}
        variants={itemVariants}
      >
        <div
          className="relative aspect-[16/10] overflow-hidden rounded-lg cursor-pointer"
          onClick={handleNavigation}
        >
          <ThumbnailPreview
            theme={theme}
            slide={JSON.parse(JSON.stringify(slideData))?.[0]}
          />
        </div>
        <div className="w-full">
          <div className="space-y-1">
            <h3 className="font-semibold text-base text-primary line-clamp-1">
              {title}
            </h3>
            <div className="flex w-full justify-between items-center gap-2">
              <p
                className="text-sm text-muted-foreground"
                suppressHydrationWarning
              >
                {createdAt && timeAgo(createdAt)}
              </p>
              {isDelete ? (
                <AlertDialogBox
                  description="This will recover your projects and restore your data."
                  className="bg-green-500 text-white dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700"
                  loading={loading}
                  open={open}
                  onClick={handleRecover}
                  handleOpen={() => setOpen(!open)}
                >
                  <Button
                    size={"sm"}
                    variant={"ghost"}
                    className="bg-background/15 dark:hover:bg-background/90"
                    disabled={loading}
                  >
                    Recover
                  </Button>
                </AlertDialogBox>
              ) : (
                <AlertDialogBox
                description="This will delete your project and sent to trash."
                className="bg-red-500 text-white dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700"
                loading={loading}
                open={open}
                onClick={handleDelete}
                handleOpen={() => setOpen(!open)}
              >
                <Button
                  size={"sm"}
                  variant={"ghost"}
                  className="bg-background/15 dark:hover:bg-background/90"
                  disabled={loading}
                >
                  Delete
                </Button>
              </AlertDialogBox>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectCard;

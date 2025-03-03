"use client";
import { deleteAllProjects } from "@/actions/project";
import AlertDialogBox from "@/components/global/alert-dialog";
import { Button } from "@/components/ui/button";
import { Project } from "@/db/schema";
import { useToast } from "@/hooks/use-toast";
import { InferSelectModel } from "drizzle-orm";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type ProjectType = InferSelectModel<typeof Project>;

interface DeleteAllButtonProps {
  Projects: ProjectType[];
}

const DeleteAllButton = ({ Projects }: DeleteAllButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { toast } = useToast();

  const handleDeleteAllProjects = async () => {
    setLoading(true);
    if (!Projects || Projects.length === 0) {
      setLoading(false);
      toast({
        variant: "destructive",
        description: "No projects found",
      });
      setOpen(false);
    }
    try {
      const projectIds = Projects.map((project) => project.id);
      const response = await deleteAllProjects(projectIds);

      if (response.status !== 200) {
        throw new Error("Failed to delete all projects");
      }
      router.refresh();
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to delete all projects",
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <AlertDialogBox
      description="This action cannot be undone.This will permanently delete all your porject aand remove your data"
      className="bg-red-600 text-white dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700"
      onClick={handleDeleteAllProjects}
      loading={loading}
      handleOpen={() => setOpen(!open)}
      open={open}
    >
      <Button
        size={"lg"}
        className="bg-background-80 rounded-lg dark:hover:bg-background-90 text-primary font-semibold hover:text-white"
      >
        <Trash />
        Delete All
      </Button>
    </AlertDialogBox>
  );
};

export default DeleteAllButton;

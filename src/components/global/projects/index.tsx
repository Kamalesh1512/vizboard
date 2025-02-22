'use client'
import React from "react";
import { motion } from "framer-motion";
import { InferSelectModel } from "drizzle-orm";
import { Project } from "@/db/schema";
import { containerVariants } from "@/lib/constants";
import ProjectCard from "../project-card";

type ProjectType = InferSelectModel<typeof Project>;

interface ProjectsProps {
  projects: ProjectType[];
}

const Projects = ({ projects }: ProjectsProps) => {
  return (<motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {projects.map((project, id) => (
          <ProjectCard
            key={id}
            projectId={project?.id}
            title={project?.title}
            createdAt={project?.createdAt}
            isDelete={project?.isDeleted}
            slideData={project?.slides}
            themeName={project?.themeName}
          />
        ))}
      </motion.div>)
};

export default Projects;

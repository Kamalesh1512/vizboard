"use server";
import { error } from "console";
import { onAuthenticateUser } from "./user";
import {
  getProjects,
  updateProject,
  addProject,
  getProjectBasedOnId,
  getProjectsByUser,
  deleteAllProjectsById,
} from "@/db/queries";
import { OutlineCard } from "@/lib/types";

export const getAllProjects = async () => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "⚠️ User Not Authenticated" };
    }
    const projects = await getProjects(checkUser.user.id,false,0);

    if (projects.length === 0) {
      return { status: 404, error: "No Projects Found" };
    }
    return { status: 200, data: projects };
  } catch (error) {
    console.log("⚠️ ERROR ", error);
    return { status: 500, error: "Internal Server Error" };
  }
};

export const getRecentProjects = async () => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "⚠️ User Not Authenticated" };
    }
    const projects = await getProjects(checkUser.user.id, false,5);

    if (projects.length === 0) {
      return {
        status: 404,
        error: "No recent porjects available",
      };
    }
    return { status: 200, data: projects };
  } catch (error) {
    console.log("⚠️ ERROR ", error);
    return { status: 500, error: "Internal Server Error" };
  }
};

export const recoverProject = async (projectId: string) => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "⚠️ User Not Authenticated" };
    }
    const updatedProject = await updateProject(projectId, { isDeleted: false });

    if (!updatedProject) {
      return { status: 500, error: " Failed to recover project" };
    }
    return { status: 200, data: updatedProject.rowCount };
  } catch (error) {
    console.log("⚠️ ERROR ", error);
    return { status: 500, error: "Internal Server Error" };
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "⚠️ User Not Authenticated" };
    }
    const updatedProject = await updateProject(projectId, { isDeleted: true });

    if (!updatedProject.rowCount) {
      return { status: 500, error: "Failed to delete project" };
    }
    return { status: 200, data: updatedProject.rowCount };
  } catch (error) {
    console.log("⚠️ ERROR ", error);
    return { status: 500, error: "Internal Server Error" };
  }
};

// action which creates a project
export const generateProject = async (
  title: string,
  outlines: OutlineCard[]
) => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "⚠️ User Not Authenticated" };
    }
    if (!title || !outlines || outlines.length === 0) {
      return { status: 400, error: "Missing Fields are required" };
    }
    const allOutlines = outlines.map((outline) => outline.title);

    const projectAdded = await addProject(
      title,
      checkUser.user.id,
      allOutlines
    );

    if (!projectAdded) {
      return { status: 500, error: "Failed to generate project" };
    }
    return { status: 200, data: projectAdded };
  } catch (error) {
    console.log("⚠️ ERROR ", error);
    return { status: 500, error: "Internal Server Error" };
  }
};

export const getProjectById = async (projectId: string) => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "⚠️ User Not Authenticated" };
    }

    const project = await getProjectBasedOnId(projectId);
    if (!project) {
      return { status: 404, error: "Project not found" };
    }
    return { status: 200, data: project };
  } catch (error) {
    console.log("⚠️ ERROR ", error);
    return { status: 500, error: "Internal Server Error" };
  }
};

export const updateSlides = async (projectId: string, slides: JSON) => {
  try {
    if (!projectId || !slides) {
      return { status: 400, error: "Project ID and slides are required" };
    }

    const updatedProject = await updateProject(projectId, { slides: slides });
    if (!updatedProject) {
      return { status: 500, error: "Failed to update slides" };
    }
    return { status: 200, data: updatedProject.rowCount };
  } catch (error) {
    console.log("⚠️ ERROR ", error);
    return { status: 500, error: "Internal Server Error" };
  }
};

export const updateTheme = async (projectId: string, theme: string) => {
  try {
    if (!projectId || !theme) {
      return { status: 400, error: "Project ID and themes are required" };
    }

    const updatedProject = await updateProject(projectId, { themeName: theme });
    if (!updatedProject) {
      return { status: 500, error: "Failed to update theme" };
    }
    return { status: 200, data: updatedProject.rowCount };
  } catch (error) {
    console.log("⚠️ ERROR ", error);
    return { status: 500, error: "Internal Server Error" };
  }
};

export const deleteAllProjects = async (projectIds: string[]) => {
  try {
    if (!Array.isArray(projectIds) || projectIds.length === 0) {
      return { status: 400, error: "No Project IDs are Provided" };
    }

    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "⚠️ User Not Authenticated" };
    }

    const userId = checkUser.user.id;
    const projectsToDelete = await getProjectsByUser(userId, projectIds);
    if (!projectsToDelete || projectsToDelete.length === 0) {
      return { status: 500, error: "No projects found for the given ids" };
    }
    const Ids = projectsToDelete.map((project) => project.id);

    const deletedProjects = await deleteAllProjectsById(Ids);

    return { status: 200, data: deletedProjects.length };
  } catch (error) {
    console.log("⚠️ ERROR ", error);
    return { status: 500, error: "Internal Server Error" };
  }
};

export const getDeletedProjects = async () => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "⚠️ User Not Authenticated" };
    }
    //get deleted projects
    const projects = await getProjects(checkUser.user.id, true,0);

    // console.log("deleted projects",projects)

    if (!projects) {
      return { status: 400, message: "No deleted projects found", data: [] };
    }
    return { status: 200, data: projects };
  } catch (error) {
    console.log("⚠️ ERROR ", error);
    return { status: 500, error: "Internal Server Error" };
  }
};

"use server";
import { error } from "console";
import { onAuthenticateUser } from "./user";
import {
  getUserProjects,
  getProjects,
  updateProject,
  addProject,
  getProjectBasedOnId,
} from "@/db/queries";
import { OutlineCard } from "@/lib/types";

export const getAllProjects = async () => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "⚠️ User Not Authenticated" };
    }
    const projects = await getUserProjects(checkUser.user.id);

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
    const projects = await getProjects(checkUser.user.id, false);

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
    const updatedProject = await updateProject(projectId, false);

    if (!updatedProject) {
      return { status: 500, error: " Failed to recover project" };
    }
    return { status: 200, data: updatedProject };
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
    const updatedProject = await updateProject(projectId, true);

    if (!updatedProject) {
      return { status: 500, error: "Failed to delete project" };
    }
    return { status: 200, data: updatedProject };
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

"use server"
import { error } from "console";
import { onAuthenticateUser } from "./user";
import { getUserProjects } from "@/db/queries";

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
    console.log("⚠️ Error ", error);
    return { status: 500 ,error:"Internal Server Error"};
  }
};

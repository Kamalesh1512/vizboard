import { Project, Purchasers, User } from "@/db/schema";
import { db } from "@/db/index";
import { desc, eq } from "drizzle-orm";

export async function getUserById(userId: string) {
  if (!userId) {
    throw new Error("Invalid userId: userId is required");
  }

  try {
    const existingUser = await db
      .select({
        id: User.id,
        clerkId: User.clerkId,
        email: User.email,
        purchasedProjects: Project.id, // Fetching only project ID
      })
      .from(User)
      .leftJoin(Purchasers, eq(User.id, Purchasers.userId))
      .leftJoin(Project, eq(Purchasers.projectId, Project.id))
      .where(eq(User.clerkId, userId));

    return existingUser[0];
  } catch (error) {
    console.error("Database query error [USER_TABLE]:", error);
    throw new Error("Failed to fetch user");
  }
}

export async function addUser(
  userId: string,
  email: string,
  username: string,
  image: string
) {
  if (!userId) {
    throw new Error("Invalid userId: userId is required");
  }

  try {
    const newUser=await db.insert(User).values({
      clerkId: userId,
      email: email,
      name: username,
      profileImage: image,
    }).returning();
    return newUser[0]
  } catch (error) {
    console.error("Database query error [USER_TABLE]:", error);
    throw new Error("Failed to add new user");
  }
}


export async function getUserProjects(userId: string) {
  if (!userId) {
    throw new Error("Invalid userId: userId is required");
  }

  try {
    const projects = await db
      .select()
      .from(Project)
      .where(eq(Project.userId ,userId))
      .orderBy(desc(Project.updatedAt));

    return projects;
  } catch (error) {
    console.error("Database query error [PROJECT_TABLE]:", error);
    throw new Error("Failed to fetch projects");
  }
}
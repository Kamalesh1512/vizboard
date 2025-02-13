"use server"
import { addUser, getUserById } from "@/db/queries";
import { currentUser } from "@clerk/nextjs/server";

export const onAuthenticateUser = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 403 };
    }
    const existingUser = await getUserById(user.id);

    if (existingUser) {
      return { status: 200, user: existingUser };
    } else {
      const newUser = await addUser(
        user.id,
        user.emailAddresses[0].emailAddress,
        user.firstName + " " + user.lastName,
        user.imageUrl
      );
      return { status: 201, user: newUser };
    }
  } catch (error) {
    console.log("⚠️ Error ", error);
    return { status: 500 ,error:"Internal Server Error" };
  }
};

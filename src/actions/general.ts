"use server"
import { error } from "console";
import { onAuthenticateUser } from "./user";
import { 
    BlobServiceClient, 
    StorageSharedKeyCredential, 
    BlobSASPermissions, 
    generateBlobSASQueryParameters } from "@azure/storage-blob";

export const generateSasUrl = async (fileName: string) => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "⚠️ User Not Authenticated" };
    }

    const accountName = process.env.NEXT_AZURE_STORAGE_ACCOUNT_NAME!;
    const accountKey = process.env.NEXT_AZURE_STORAGE_ACCOUNT_KEY!;
    const containerName = process.env.NEXT_AZURE_STORAGE_CONTAINER_NAME!;

    if (!fileName) {
        return { status: 500 , error:"Missing Field Required"}
    }
    const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
    const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, sharedKeyCredential);
    const containerClient = blobServiceClient.getContainerClient(containerName);


    // Set the permissions for the presigned URL (write access)
    const sasOptions = {
        containerName: containerClient.containerName,
        blobName : fileName,
        permissions: BlobSASPermissions.parse("rw"), // Write access
        expiresOn: new Date(new Date().valueOf() + 5 * 60 * 1000), // 5 minutes
        };

        const sasToken = generateBlobSASQueryParameters(sasOptions, sharedKeyCredential).toString();
        const presignedUrl = `https://${accountName}.blob.core.windows.net/${containerName}/${fileName}?${sasToken}`;

        console.log("sas url:",presignedUrl)

        return { status: 200, data: presignedUrl };
  } catch (error) {
    console.log("⚠️ ERROR ", error);
    return { status: 500, error: "Internal Server Error" };
  }
};
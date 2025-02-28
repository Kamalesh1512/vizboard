"use client";
import { useState } from "react";
import { generateSasUrl } from "@/actions/general";

export default function UploadImage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setMessage("");

    try {
      const response = await generateSasUrl(file.name);
      if (response.status === 200 && response.data) {

        const blobUrl = response.data
      // Step 2: Upload file to Azure Blob Storage using SAS URL
      const uploadResponse = await fetch(blobUrl, {
        method: "PUT",
        headers: { "x-ms-blob-type": "BlockBlob", "Content-Type": file.type },
        body: file,
      });

      if (uploadResponse.ok) {
        setMessage("Upload successful!");
      } else {
        setMessage("Upload failed.");
      }
    }
   }
    catch (error) {
      setMessage("Upload error.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 border rounded-md shadow-md w-96">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        disabled={uploading || !file}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
    </div>
  );
}

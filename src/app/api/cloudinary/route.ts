import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";

import { NextRequest, NextResponse } from "next/server";

import { cloudinary } from "@/lib/cloudinary"; // your config path

type UploadResponse =
  | { success: true; result?: UploadApiResponse }
  | { success: false; error: UploadApiErrorResponse };

const uploadToCloudinary = (
  fileUri: string,
  fileName: string,
  folderName: string
): Promise<UploadResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload(fileUri, {
        invalidate: true,
        resource_type: "auto",
        use_filename: true,
        unique_filename: true,
        folder: `cvbaza/${folderName}`,
        filename_override: fileName,
      })
      .then((result) => {
        resolve({ success: true, result });
      })
      .catch((error) => {
        reject({ success: false, error });
      });
  });
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folderName = formData.get("folderName") as string | null;

    // Input validation
    if (!file || !folderName) {
      return NextResponse.json({ message: "File and folder name are required" }, { status: 400 });
    }

    // File size validation (e.g., 10MB limit)
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ message: "File size exceeds 10MB limit" }, { status: 400 });
    }

    // File type validation
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { message: "Invalid file type. Allowed types: JPEG, PNG, WebP, PDF" },
        { status: 400 }
      );
    }

    const fileBuffer = await file.arrayBuffer();
    const mimeType = file.type;
    const encoding = "base64";
    const base64Data = Buffer.from(fileBuffer).toString("base64");
    const fileUri = `data:${mimeType};${encoding},${base64Data}`;

    const res = await uploadToCloudinary(fileUri, file.name, folderName);

    if (res.success && res.result) {
      return NextResponse.json({
        message: "success",
        fileUrl: res.result.secure_url,
        fileId: res.result.public_id,
      });
    }

    return NextResponse.json({ message: "Failed to upload file" }, { status: 500 });
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

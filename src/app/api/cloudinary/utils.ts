import { cloudinary } from "@/lib/cloudinary";

export const deleteFromCloudinary = async (
  publicId: string
): Promise<boolean> => {
  try {
    await cloudinary.uploader.destroy(publicId);
    return true;
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
    return false;
  }
};

export const getPublicIdFromUrl = (url: string): string | null => {
  try {
    // Extract the public ID from Cloudinary URL
    // URL format: https://res.cloudinary.com/[cloud_name]/image/upload/v[version]/[public_id].[extension]
    const matches = url.match(/\/v\d+\/(.+?)\./);
    return matches ? matches[1] : null;
  } catch (error) {
    console.error("Error extracting public ID:", error);
    return null;
  }
};

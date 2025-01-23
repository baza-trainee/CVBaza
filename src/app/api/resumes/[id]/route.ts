import { NextRequest, NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { educations, resumes, workExperiences } from "@/db/schema";
import { auth } from "@/lib/auth";

// Helper to extract public ID from Cloudinary URL
// const getPublicIdFromUrl = (url: string): string | null => {
//   try {
//     const matches = url.match(/\/upload\/v\d+\/(.+?)\./);
//     return matches ? `cvbaza/${matches[1]}` : null;
//   } catch (error) {
//     console.error("Error extracting public ID:", error);
//     return null;
//   }
// };

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Get the resume to check ownership and get photo URL
    const resume = await db.query.resumes.findFirst({
      where: and(
        eq(resumes.id, params.id),
        eq(resumes.userId, session.user.id)
      ),
    });

    if (!resume) {
      return NextResponse.json(
        { message: "Resume not found" },
        { status: 404 }
      );
    }

    // Delete photo from Cloudinary if exists
    if (resume.photo && resume.publicId) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/cloudinary/remove`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ imageId: resume.publicId }),
          }
        );

        if (!response.ok) {
          console.error("Failed to delete image from Cloudinary");
        }
      } catch (error) {
        console.error("Error calling Cloudinary remove endpoint:", error);
      }
    }

    // Delete related records first (due to foreign key constraints)
    await db.delete(educations).where(eq(educations.resumeId, params.id));

    await db
      .delete(workExperiences)
      .where(eq(workExperiences.resumeId, params.id));

    // Delete the resume
    await db
      .delete(resumes)
      .where(
        and(eq(resumes.id, params.id), eq(resumes.userId, session.user.id))
      );

    return NextResponse.json({ message: "Resume deleted successfully" });
  } catch (error) {
    console.error("Error deleting resume:", error);
    return NextResponse.json(
      { message: "Failed to delete resume" },
      { status: 500 }
    );
  }
}

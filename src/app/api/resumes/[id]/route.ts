import { NextRequest, NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { educations, resumes, workExperiences } from "@/db/schema";
import { auth } from "@/lib/auth";

const updateResumeSchema = z.object({
  title: z.string().min(1),
});

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Get the resume to check ownership and get photo URL
    const resume = await db.query.resumes.findFirst({
      where: and(eq(resumes.id, id), eq(resumes.userId, session.user.id)),
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
            body: JSON.stringify({ publicId: resume.publicId }),
          }
        );

        if (!response.ok) {
          console.error("Failed to delete photo from Cloudinary");
        }
      } catch (error) {
        console.error("Error deleting photo from Cloudinary:", error);
      }
    }

    // Delete resume and related data
    await db.transaction(async (tx) => {
      // Delete education records
      await tx.delete(educations).where(eq(educations.resumeId, id));

      // Delete work experience records
      await tx.delete(workExperiences).where(eq(workExperiences.resumeId, id));

      // Delete resume
      await tx.delete(resumes).where(eq(resumes.id, id));
    });

    return NextResponse.json({ message: "Resume deleted successfully" });
  } catch (error) {
    console.error("Error deleting resume:", error);
    return NextResponse.json(
      { message: "Failed to delete resume" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    // Validate request body
    const validatedData = updateResumeSchema.parse(body);

    // Check if resume exists and belongs to user
    const resume = await db.query.resumes.findFirst({
      where: and(eq(resumes.id, id), eq(resumes.userId, session.user.id)),
    });

    if (!resume) {
      return NextResponse.json(
        { message: "Resume not found" },
        { status: 404 }
      );
    }

    // Update resume title
    const [updatedResume] = await db
      .update(resumes)
      .set({ title: validatedData.title })
      .where(and(eq(resumes.id, id), eq(resumes.userId, session.user.id)))
      .returning();

    return NextResponse.json(updatedResume);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid request data", errors: error.errors },
        { status: 400 }
      );
    }

    console.error("Error updating resume:", error);
    return NextResponse.json(
      { message: "Failed to update resume" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { educations, resumes, workExperiences } from "@/db/schema";
import { auth } from "@/lib/auth";
import { uploadBase64Image } from "../cloudinary/upload";
import { resumeSchema } from "./schema";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    try {
      const validatedData = resumeSchema.parse(data);

      // Handle photo upload if it's a base64 string
      if (
        validatedData.photo &&
        typeof validatedData.photo === "string" &&
        validatedData.photo.startsWith("data:image")
      ) {
        const { url } = await uploadBase64Image(validatedData.photo);
        validatedData.photo = url;
      }

      // Insert resume
      const [resume] = await db
        .insert(resumes)
        .values({
          ...validatedData,
          userId: session.user.id,
        })
        .returning();

      // Insert educations
      if (validatedData.educations && validatedData.educations.length > 0) {
        await db.insert(educations).values(
          validatedData.educations.map((edu) => ({
            ...edu,
            resumeId: resume.id,
          }))
        );
      }

      // Insert work experiences
      if (
        validatedData.workExperiences &&
        validatedData.workExperiences.length > 0
      ) {
        await db.insert(workExperiences).values(
          validatedData.workExperiences.map((exp) => ({
            ...exp,
            resumeId: resume.id,
          }))
        );
      }

      return NextResponse.json(resume);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          {
            message: "Invalid resume data",
            errors: (error as z.ZodError).errors,
          },
          { status: 400 }
        );
      }
      throw error;
    }
  } catch (error) {
    console.error("Error creating resume:", error);
    return NextResponse.json(
      { message: "Failed to create resume" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userResumes = await db
      .select()
      .from(resumes)
      .where(eq(resumes.userId, session.user.id))
      .leftJoin(educations, eq(educations.resumeId, resumes.id))
      .leftJoin(workExperiences, eq(workExperiences.resumeId, resumes.id))
      .orderBy(desc(resumes.updatedAt));

    return NextResponse.json(userResumes);
  } catch (error) {
    console.error("Error fetching resumes:", error);
    return NextResponse.json(
      { message: "Failed to fetch resumes" },
      { status: 500 }
    );
  }
}

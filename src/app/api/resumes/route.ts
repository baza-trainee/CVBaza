import { NextRequest, NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { educations, resumes, workExperiences } from "@/db/schema";
import { resumeSchema } from "./schema";

export async function POST(req: NextRequest) {
  try {
    //TODO: add auth
    const hardcodedUserId = "c6f5d462-17cb-4a13-84b5-3a03bece5a8f";

    const body = await req.json();
    const validatedData = resumeSchema.parse(body);

    //TODO: add uploading photo to cloudinary
    const [newResume] = await db
      .insert(resumes)
      .values({
        userId: hardcodedUserId,
        title: validatedData.title,
        name: validatedData.name,
        profession: validatedData.profession,
        photo: validatedData.photo,
        summary: validatedData.summary,
        location: validatedData.location,
        phone: validatedData.phone,
        email: validatedData.email,
        telegram: validatedData.telegram,
        github: validatedData.github,
        linkedin: validatedData.linkedin,
        behance: validatedData.behance,
        dribbble: validatedData.dribbble,
        adobePortfolio: validatedData.adobePortfolio,
        template: validatedData.template,
        skills: validatedData.skills,
        languages: validatedData.languages,
      })
      .returning();

    // Insert education records if provided
    if (validatedData.education?.length) {
      await db.insert(educations).values(
        validatedData.education.map((edu) => ({
          degree: edu.degree,
          institution: edu.institution,
          startDate: edu.startDate,
          endDate: edu.endDate,
          resumeId: newResume.id,
        }))
      );
    }

    // Insert work experience records if provided
    if (validatedData.workExperience?.length) {
      await db.insert(workExperiences).values(
        validatedData.workExperience.map((exp) => ({
          position: exp.position,
          company: exp.company,
          startDate: exp.startDate,
          endDate: exp.endDate,
          description: exp.description,
          resumeId: newResume.id,
        }))
      );
    }

    // Fetch the complete resume
    const completeResume = await db
      .select()
      .from(resumes)
      .where(eq(resumes.id, newResume.id))
      .leftJoin(educations, eq(educations.resumeId, resumes.id))
      .leftJoin(workExperiences, eq(workExperiences.resumeId, resumes.id));

    return NextResponse.json(completeResume, { status: 201 });
  } catch (error) {
    console.error("Resume creation error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        error: "Something went wrong",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

//TODO: get resumes by current user
export async function GET() {
  try {
    const allResumes = await db
      .select()
      .from(resumes)
      .orderBy(desc(resumes.createdAt));

    const resumesWithRelations = await Promise.all(
      allResumes.map(async (resume) => {
        const [resumeEducations, resumeWorkExperiences] = await Promise.all([
          db
            .select()
            .from(educations)
            .where(eq(educations.resumeId, resume.id)),
          db
            .select()
            .from(workExperiences)
            .where(eq(workExperiences.resumeId, resume.id)),
        ]);

        return {
          ...resume,
          educations: resumeEducations,
          workExperiences: resumeWorkExperiences,
        };
      })
    );

    return NextResponse.json(resumesWithRelations);
  } catch (error) {
    console.error("Error fetching resumes:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch resumes",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

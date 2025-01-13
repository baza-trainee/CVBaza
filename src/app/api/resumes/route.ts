import { NextRequest, NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { educations, resumes, workExperiences } from "@/db/schema";
import { auth } from "@/lib/auth";

const educationSchema = z.object({
  degree: z.string().max(255),
  school: z.string().max(255),
  description: z.string().optional(),
  startDate: z.string().max(255),
  endDate: z.string().max(255),
});

const workExperienceSchema = z.object({
  position: z.string().max(255),
  company: z.string().max(255),
  location: z.string().max(255),
  startDate: z.string().max(255),
  endDate: z.string().max(255),
  description: z.string().optional(),
});

const resumeSchema = z.object({
  title: z.string().max(255),
  profession: z.string().optional(),
  photoUrl: z.string().url().max(2048).optional(),
  summary: z.string().optional(),
  name: z.string().max(255),
  address: z.string().max(100).optional(),
  phone: z.string().max(50).optional(),
  email: z.string().email().max(320),
  github: z.string().max(255).optional(),
  linkedin: z.string().max(255).optional(),
  behance: z.string().max(255).optional(),
  template: z.string().max(255),
  skills: z.array(z.string()).optional(),
  languages: z
    .array(
      z.object({
        language: z.string(),
        level: z.string(),
      })
    )
    .optional(),
  education: z.array(educationSchema).optional(),
  workExperience: z.array(workExperienceSchema).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be logged in to create a resume" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const validatedData = resumeSchema.parse(body);

    const [newResume] = await db
      .insert(resumes)
      .values({
        ...validatedData,
        userId: session.user.id,
        skills: validatedData.skills || [],
        languages: validatedData.languages || [],
      })
      .returning();

    // Insert education records if provided
    if (validatedData.education?.length) {
      await db.insert(educations).values(
        validatedData.education.map((edu) => ({
          ...edu,
          resumeId: newResume.id,
        }))
      );
    }

    // Insert work experience records if provided
    if (validatedData.workExperience?.length) {
      await db.insert(workExperiences).values(
        validatedData.workExperience.map((exp) => ({
          ...exp,
          resumeId: newResume.id,
        }))
      );
    }

    // Fetch the complete resume with relations
    const completeResume = await db.query.resumes.findFirst({
      where: eq(resumes.id, newResume.id),
      with: {
        educations: true,
        workExperiences: true,
      },
    });

    return NextResponse.json(completeResume, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

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
      { error: "Failed to fetch resumes" },
      { status: 500 }
    );
  }
}

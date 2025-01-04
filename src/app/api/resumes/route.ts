import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { desc } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { educations, resumes, workExperiences } from "@/db/schema";
import { auth } from "@/lib/auth";

const resumeSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().optional(),
  photoUrl: z.string().url().max(2048).optional(),
  colorHex: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/)
    .optional(),
  borderStyle: z.string().max(50).optional(),
  summary: z.string().optional(),
  firstName: z.string().min(1).max(255),
  lastName: z.string().min(1).max(255),
  jobTitle: z.string().min(1).max(255),
  city: z.string().max(100).optional(),
  country: z.string().max(100).optional(),
  phone: z.string().max(50).optional(),
  email: z.string().email().max(320),
  skills: z.array(z.string()).optional(),
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
        userId: "5770b1c5-c9f4-4364-91cc-d7e653652e39",
      })
      .returning();

    return NextResponse.json(newResume, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error creating resume:", error);
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

import { NextRequest, NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { educations, resumes, workExperiences } from "@/db/schema";
import { auth } from "@/lib/auth";
import { uploadBase64Image } from "../cloudinary/route";
import { resumeSchema } from "./schema";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const jsonData = formData.get("data");

    if (!jsonData) {
      return NextResponse.json(
        { message: "No resume data provided" },
        { status: 400 }
      );
    }

    let resumeData = JSON.parse(jsonData as string);
    console.log("Received resume data:", resumeData);

    // Upload photo to Cloudinary if provided
    if (resumeData.photo && !resumeData.photo.startsWith("http")) {
      console.log("Found photo data, uploading to Cloudinary...");
      try {
        const { url, publicId } = await uploadBase64Image(resumeData.photo);
        resumeData = { ...resumeData, photo: url, publicId };
      } catch (error) {
        console.error("Failed to upload photo:", error);
        return NextResponse.json(
          { message: "Failed to upload photo" },
          { status: 500 }
        );
      }
    }

    // Validate the data after handling the photo upload
    const validatedData = resumeSchema.parse(resumeData);

    // Create resume
    const [newResume] = await db
      .insert(resumes)
      .values({
        userId: session.user.id,
        title: validatedData.title,
        name: validatedData.name,
        profession: validatedData.profession,
        photo: validatedData.photo,
        publicId: validatedData.publicId,
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
    if (validatedData.educations?.length) {
      await db.insert(educations).values(
        validatedData.educations.map((edu) => ({
          degree: edu.degree,
          institution: edu.institution,
          startDate: edu.startDate,
          endDate: edu.endDate,
          resumeId: newResume.id,
        }))
      );
    }

    // Insert work experience records if provided
    if (validatedData.workExperiences?.length) {
      await db.insert(workExperiences).values(
        validatedData.workExperiences.map((exp) => ({
          position: exp.position,
          company: exp.company,
          startDate: exp.startDate,
          endDate: exp.endDate,
          description: exp.description,
          resumeId: newResume.id,
        }))
      );
    }

    // Fetch the complete resume with relations
    const [completeResume] = await db
      .select()
      .from(resumes)
      .where(eq(resumes.id, newResume.id))
      .leftJoin(educations, eq(educations.resumeId, resumes.id))
      .leftJoin(workExperiences, eq(workExperiences.resumeId, resumes.id));

    // Format response
    const formattedResume = {
      ...completeResume.resumes,
      educations: completeResume.educations ? [completeResume.educations] : [],
      workExperiences: completeResume.work_experiences
        ? [completeResume.work_experiences]
        : [],
    };

    return NextResponse.json(formattedResume);
  } catch (error) {
    console.error("Error creating resume:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid resume data", errors: error.errors },
        { status: 400 }
      );
    }
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

    // Fetch resumes with relations
    const userResumes = await db
      .select()
      .from(resumes)
      .where(eq(resumes.userId, session.user.id))
      .leftJoin(educations, eq(educations.resumeId, resumes.id))
      .leftJoin(workExperiences, eq(workExperiences.resumeId, resumes.id))
      .orderBy(desc(resumes.updatedAt));

    // Format response
    const formattedResumes = userResumes.map((resume) => ({
      ...resume.resumes,
      educations: resume.educations ? [resume.educations] : [],
      workExperiences: resume.work_experiences ? [resume.work_experiences] : [],
    }));

    return NextResponse.json(formattedResumes);
  } catch (error) {
    console.error("Error fetching resumes:", error);
    return NextResponse.json(
      { message: "Failed to fetch resumes" },
      { status: 500 }
    );
  }
}

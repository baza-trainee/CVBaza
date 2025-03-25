"use server";

import { NextRequest, NextResponse } from "next/server";
import { and, desc, eq } from "drizzle-orm";
import { interviewFormSchema } from "@/components/profile/interviewer/forms/schema";
import { db } from "@/db";
import { interviews } from "@/db/schema";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { data } = body;

    if (!data) {
      return NextResponse.json(
        { message: "Invalid interview data" },
        { status: 400 }
      );
    }

    try {
      const validatedData = interviewFormSchema.parse(data);

      // Insert interview
      const [interview] = await db
        .insert(interviews)
        .values({
          jobPosition: validatedData.position,
          jobDescription: validatedData.description,
          jobExperience: validatedData.yearsOfExperience,
          techStack: validatedData.techStack || [],
          createdBy: session.user.id,
          createdAt: new Date().toISOString(),
          mockId: crypto.randomUUID(),
        })
        .returning();

      return NextResponse.json(interview);
    } catch (error) {
      console.error("Validation error:", error);
      return NextResponse.json(
        { message: "Invalid interview data", error },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error creating interview:", error);
    return NextResponse.json(
      { message: "Failed to create interview", error },
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

    // Get all interviews for the user
    const userInterviews = await db
      .select()
      .from(interviews)
      .where(eq(interviews.createdBy, session.user.id))
      .orderBy(desc(interviews.createdAt));

    return NextResponse.json(userInterviews);
  } catch (error) {
    console.error("Error fetching interviews:", error);
    return NextResponse.json(
      { message: "Failed to fetch interviews" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const mockId = searchParams.get("mockId");

    if (!mockId) {
      return NextResponse.json(
        { message: "Interview ID is required" },
        { status: 400 }
      );
    }

    // Delete the interview with the given mockId and belonging to the current user
    const result = await db
      .delete(interviews)
      .where(
        and(
          eq(interviews.mockId, mockId),
          eq(interviews.createdBy, session.user.id)
        )
      )
      .returning({ id: interviews.id });

    if (result.length === 0) {
      return NextResponse.json(
        {
          message:
            "Interview not found or you don't have permission to delete it",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting interview:", error);
    return NextResponse.json(
      { message: "Failed to delete interview", error },
      { status: 500 }
    );
  }
}

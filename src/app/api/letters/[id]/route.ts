import { NextRequest, NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { letters } from "@/db/schema";
import { auth } from "@/lib/auth";

const updateLetterSchema = z.object({
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

    // Get the letter to check ownership and get photo URL
    const letter = await db.query.letters.findFirst({
      where: and(eq(letters.id, id), eq(letters.userId, session.user.id)),
    });

    if (!letter) {
      return NextResponse.json(
        { message: "The letter not found" },
        { status: 404 }
      );
    }

    // Delete a letter and related a data
    await db.transaction(async (tx) => {
      // Delete a letter
      await tx.delete(letters).where(eq(letters.id, id));
    });

    return NextResponse.json({ message: "The letter deleted successfully" });
  } catch (error) {
    console.error("Error deleting the letter:", error);
    return NextResponse.json(
      { message: "Failed to delete the letter" },
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
    const validatedData = updateLetterSchema.parse(body);

    // Check if a letter exists and belongs to an user
    const letter = await db.query.letters.findFirst({
      where: and(eq(letters.id, id), eq(letters.userId, session.user.id)),
    });

    if (!letter) {
      return NextResponse.json(
        { message: "The letter not found" },
        { status: 404 }
      );
    }

    // Update the title of the letter
    const [updatedLetter] = await db
      .update(letters)
      .set({ title: validatedData.title })
      .where(and(eq(letters.id, id), eq(letters.userId, session.user.id)))
      .returning();

    return NextResponse.json(updatedLetter);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid request data", errors: error.errors },
        { status: 400 }
      );
    }

    console.error("Error updating the letter:", error);
    return NextResponse.json(
      { message: "Failed to update the letter" },
      { status: 500 }
    );
  }
}

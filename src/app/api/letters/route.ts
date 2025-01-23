import { NextRequest, NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { letters } from "@/db/schema";
import { letterSchema } from "./schema";

export async function POST(req: NextRequest) {
  try {
    // !!!!!!!!!!!!! what is it and where to take? From auth?..
    const hardcodedUserId = "c6f5d462-17cb-4a13-84b5-3a03bece5a8f";

    const body = await req.json();
    const validatedData = letterSchema.parse(body);

    const [newLetter] = await db
      .insert(letters)
      .values({
        userId: hardcodedUserId,
        title: validatedData.title,
        name: validatedData.name,
        profession: validatedData.profession,
        position: validatedData.position,
        company: validatedData.company,
        location: validatedData.location,
        phone: validatedData.phone,
        email: validatedData.email,
        nameRecipient: validatedData.nameRecipient,
        positionRecipient: validatedData.positionRecipient,
        text: validatedData.text,
        template: validatedData.template,
      })
      .returning();

    // Fetch the complete resume
    const completeLetter = await db
      .select()
      .from(letters)
      .where(eq(letters.id, newLetter.id));

    return NextResponse.json(completeLetter, { status: 201 });
  } catch (error) {
    console.error("Letter creation error:", error);

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

export async function GET() {
  try {
    const allLetters = await db
      .select()
      .from(letters)
      .orderBy(desc(letters.createdAt));

    const lettersWithRelations = allLetters.map((letter) => ({ ...letter }));

    return NextResponse.json(lettersWithRelations);
  } catch (error) {
    console.error("Error fetching letters:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch letters",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

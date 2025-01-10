import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { users } from "@/db/schema";
import { hashPassword } from "@/utils/password";

const resetSchema = z.object({
  token: z.string(),
  password: z.string().min(8),
});

const ONE_HOUR = 60 * 60 * 1000; // 1 hour in milliseconds

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, password } = resetSchema.parse(body);

    // Decode token to get user ID and timestamp
    const tokenData = Buffer.from(token, "base64").toString();
    const [userId, timestamp] = tokenData.split("-");

    // Check if token is expired (1 hour)
    const tokenTime = parseInt(timestamp);
    if (Date.now() - tokenTime > ONE_HOUR) {
      return NextResponse.json(
        { error: "Reset link has expired" },
        { status: 400 }
      );
    }

    // Find user
    const [user] = await db.select().from(users).where(eq(users.id, userId));

    if (!user) {
      return NextResponse.json(
        { error: "Invalid reset link" },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await hashPassword(password);

    // Update password
    await db
      .update(users)
      .set({ password: hashedPassword })
      .where(eq(users.id, userId));

    return NextResponse.json({
      message: "Password has been reset successfully",
    });
  } catch (error) {
    console.error("Error in reset password:", error);
    return NextResponse.json(
      { error: "Failed to reset password" },
      { status: 500 }
    );
  }
}

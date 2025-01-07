import { eq } from "drizzle-orm";
import nodemailer from "nodemailer";
import { z } from "zod";

import { NextRequest, NextResponse } from "next/server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { env } from "@/env";

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: true,
  service: env.SMTP_SERVICE,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASSWORD,
  },
  debug: env.SMTP_DEBUG,
});

const requestSchema = z.object({
  email: z.string().email(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = requestSchema.parse(body);

    // Find user by email
    const [user] = await db.select().from(users).where(eq(users.email, email));

    if (!user) {
      // Return success even if user not found to prevent email enumeration
      return NextResponse.json({
        message: "If an account exists with that email, a password reset link has been sent.",
      });
    }

    // Generate reset token
    const timestamp = Date.now();
    const tokenData = `${user.id}-${timestamp}`;
    const token = Buffer.from(tokenData).toString("base64");

    // Send reset email
    const resetUrl = `${env.NEXT_PUBLIC_APP_URL}/reset-password/${token}`;

    try {
      const mailOptions = {
        from: env.SMTP_FROM,
        to: email,
        subject: "Reset your password",
        html: `
          <h1>Reset Your Password</h1>
          <p>Click the link below to reset your password. This link will expire in 1 hour.</p>
          <a href="${resetUrl}">Reset Password</a>
          <p>If you didn't request this, please ignore this email.</p>
        `,
      };

      await transporter.sendMail(mailOptions);

      return NextResponse.json({
        message: "If an account exists with that email, a password reset link has been sent.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return NextResponse.json(
        { error: "Failed to send reset email", details: emailError },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in forgot password:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}

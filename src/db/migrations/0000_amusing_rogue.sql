
--> statement-breakpoint
CREATE TABLE "interviews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"jobPosition" text NOT NULL,
	"jobDescription" text NOT NULL,
	"jobExperience" text NOT NULL,
	"skills" jsonb DEFAULT '[]'::jsonb,
	"createdBy" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);

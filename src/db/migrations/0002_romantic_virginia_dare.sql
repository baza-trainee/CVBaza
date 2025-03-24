CREATE TABLE "interviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"jsonMockResponse" text NOT NULL,
	"jobPosition" text NOT NULL,
	"jobDescription" text NOT NULL,
	"jobExperience" text NOT NULL,
	"createdBy" text NOT NULL,
	"createdAt" text,
	"mockId" text NOT NULL
);

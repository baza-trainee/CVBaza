CREATE TABLE "letters" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"title" varchar(255),
	"name" varchar(255),
	"profession" text,
	"position" text,
	"company" varchar(255),
	"location" varchar(100),
	"phone" varchar(50),
	"email" varchar(320),
	"nameRecipient" varchar(255),
	"positionRecipient" text,
	"text" text,
	"template" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "letters" ADD CONSTRAINT "letters_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
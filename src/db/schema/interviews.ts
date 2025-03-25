import { jsonb, pgTable, serial, text } from "drizzle-orm/pg-core";

export const interviews = pgTable("interviews", {
  id: serial("id").primaryKey(),
  jobPosition: text("jobPosition").notNull(),
  jobDescription: text("jobDescription").notNull(),
  jobExperience: text("jobExperience").notNull(),
  techStack: jsonb("skills").$type<string[]>().default([]),
  createdBy: text("createdBy").notNull(),
  createdAt: text("createdAt"),
  mockId: text("mockId").notNull(),
});

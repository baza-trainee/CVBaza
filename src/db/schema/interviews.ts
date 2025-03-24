import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const interviews = pgTable("interviews", {
  id: serial("id").primaryKey(),
  jsonMockResponse: text("jsonMockResponse").notNull(),
  jobPosition: text("jobPosition").notNull(),
  jobDescription: text("jobDescription").notNull(),
  jobExperience: text("jobExperience").notNull(),
  createdBy: text("createdBy").notNull(),
  createdAt: text("createdAt"),
  mockId: text("mockId").notNull(),
});

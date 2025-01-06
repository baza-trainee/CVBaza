import { relations, sql } from "drizzle-orm";
import { jsonb, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { educations } from "./educations";
import { users } from "./users";
import { workExperiences } from "./work-experiences";

export const resumes = pgTable("resumes", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  title: varchar("title", { length: 255 }),
  description: text("description"), // Can be long, keep as text
  photoUrl: varchar("photo_url", { length: 2048 }), // URL length
  colorHex: varchar("color_hex", { length: 7 }), // #RRGGBB format
  borderStyle: varchar("border_style", { length: 50 }),
  summary: text("summary"), // Can be long, keep as text
  firstName: varchar("first_name", { length: 255 }),
  lastName: varchar("last_name", { length: 255 }),
  jobTitle: varchar("job_title", { length: 255 }),
  city: varchar("city", { length: 100 }),
  country: varchar("country", { length: 100 }),
  phone: varchar("phone", { length: 50 }),
  email: varchar("email", { length: 320 }),

  skills: jsonb("skills").$type<string[]>().default([]),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => sql`CURRENT_TIMESTAMP`
  ),
});

export const resumesRelations = relations(resumes, ({ many, one }) => ({
  educations: many(educations),
  workExperiences: many(workExperiences),
  user: one(users, {
    fields: [resumes.userId],
    references: [users.id],
  }),
}));

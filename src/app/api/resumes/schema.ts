import { z } from "zod";

export const educationSchema = z.object({
  degree: z.string().max(255),
  institution: z.string().max(255),
  startDate: z.string().max(255),
  endDate: z.string().max(255),
});

export const workExperienceSchema = z.object({
  position: z.string().max(255),
  company: z.string().max(255),
  startDate: z.string().max(255),
  endDate: z.string().max(255),
  description: z.string().optional(),
});

export const resumeSchema = z.object({
  title: z.string().max(255),
  profession: z.string().optional(),
  photo: z.string().url().max(2048).optional(),
  summary: z.string().optional(),
  name: z.string().max(255),
  location: z.string().max(100).optional(),
  phone: z.string().max(50).optional(),
  github: z.string().max(255).optional(),
  email: z.string().email().max(320),
  telegram: z.string().max(255).optional(),
  linkedin: z.string().max(255).optional(),
  behance: z.string().max(255).optional(),
  dribbble: z.string().max(255).optional(),
  adobePortfolio: z.string().max(255).optional(),
  template: z.string().max(255),
  skills: z.array(z.string()).default([]),
  languages: z
    .array(
      z.object({
        language: z.string(),
        level: z.string(),
      })
    )
    .default([]),
  education: z.array(educationSchema).optional(),
  workExperience: z.array(workExperienceSchema).optional(),
});

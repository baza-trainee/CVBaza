import { z } from "zod";
import { templates } from "@/constants";

const urlSchema = z.string().url().or(z.literal(""));

export const generalInfoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  template: z.enum([templates.CLASSIC, templates.MODERN_DARK], {
    required_error: "Please select a template",
  }),
});

export const personalInfoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  profession: z.string().min(1, "Profession is required"),
  photo: z.string().min(1, "Photo is required"),
  location: z.string().min(1, "Location is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email("Invalid email address"),
  telegram: z.string().optional().or(z.literal("")),
  github: urlSchema.optional(),
  behance: urlSchema.optional(),
  dribbble: urlSchema.optional(),
  adobePortfolio: urlSchema.optional(),
});

export const resumeSchema = z.object({
  ...generalInfoSchema.shape,
  ...personalInfoSchema.shape,
});

export type GeneralInfoFormValues = z.infer<typeof generalInfoSchema>;
export type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;

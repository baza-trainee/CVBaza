import { z } from "zod";
import { templates } from "@/constants";

const urlSchema = z.string().url("validation.invalidUrl").or(z.literal(""));
const optionalString = z.string().trim().optional().or(z.literal(""));

export const generalInfoSchema = z.object({
  title: z.string().min(1, "validation.titleRequired"),
  template: z.enum([templates.CLASSIC, templates.MODERN_DARK], {
    required_error: "validation.templateRequired",
  }),
});

export const personalInfoSchema = z.object({
  name: z.string().min(1, "validation.nameRequired"),
  profession: z.string().min(1, "validation.professionRequired"),
  photo: z.string().min(1, "validation.photoRequired"),
  location: z.string().min(1, "validation.locationRequired"),
  phone: z.string().min(1, "validation.phoneRequired"),
  email: z.string().email("validation.invalidEmail"),
  telegram: z.string().optional().or(z.literal("")),
  github: urlSchema,
  behance: urlSchema,
  dribbble: urlSchema,
  adobePortfolio: urlSchema,
});

export const workExperienceSchema = z.object({
  workExperiences: z
    .array(
      z.object({
        position: optionalString,
        company: optionalString,
        startDate: optionalString,
        endDate: optionalString,
        description: optionalString,
      })
    )
    .optional()
    .default([]),
});

export const resumeSchema = z.object({
  ...generalInfoSchema.shape,
  ...personalInfoSchema.shape,
  ...workExperienceSchema.shape,
});

export type GeneralInfoFormValues = z.infer<typeof generalInfoSchema>;
export type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;
export type WorkExperienceValues = z.infer<typeof workExperienceSchema>;

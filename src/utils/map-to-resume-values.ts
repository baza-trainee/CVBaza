import {
  Education,
  Language,
  ResumeData,
  WorkExperience,
} from "@/types/resume";

export function mapToResumeValues(data: ResumeData) {
  return {
    name: data.name,
    profession: data.profession,
    email: data.email,
    phone: data.phone,
    address: data.address,
    github: data.github || undefined,
    linkedin: data.linkedin || undefined,
    behance: data.behance || undefined,
    photo: data.photo || undefined,
    skills: data.skills,
    education: data.education.map((edu: Education) => ({
      id: edu.id,
      institution: edu.institution,
      degree: edu.degree,
      location: edu.location,
      startDate: edu.startDate,
      endDate: edu.endDate,
      description: edu.description,
    })),
    workExperiences: data.workExperiences.map((exp: WorkExperience) => ({
      id: exp.id,
      company: exp.company,
      position: exp.position,
      startDate: exp.startDate,
      endDate: exp.endDate,
      description: exp.description,
    })),
    languages: data.languages.map((lang: Language) => ({
      id: lang.id,
      name: lang.name,
      level: lang.level,
    })),
    summary: data.summary || undefined,
  };
}

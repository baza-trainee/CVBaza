export interface Education {
  id: number;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface WorkExperience {
  id: number;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Language {
  id: number;
  name: string;
  level: string;
}

export interface ResumeData {
  title: string;
  name: string;
  profession: string;
  email: string;
  phone: string;
  location: string;
  github?: string;
  linkedin?: string;
  behance?: string;
  photo: string;
  skills: string[];
  education: Education[];
  workExperiences: WorkExperience[];
  languages: Language[];
  summary: string;
  template: string;
}

export interface EditorFormProps {
  resumeData: ResumeData;
  setResumeData: (data: ResumeData) => void;
}

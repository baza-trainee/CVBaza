export interface Education {
  institution?: string;
  degree?: string;
  startDate?: string;
  endDate?: string;
}

export interface WorkExperience {
  id?: string;
  company?: string;
  position?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

export interface Language {
  name?: string;
  level?: string;
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
  telegram?: string;
  dribbble?: string;
  adobePortfolio?: string;
  photo: string;
  skills: string[];
  educations: Education[];
  workExperiences: WorkExperience[];
  languages: Language[];
  summary: string;
  template: string;
}

export interface EditorFormProps {
  resumeData: ResumeData;
  setResumeData: (data: ResumeData) => void;
}

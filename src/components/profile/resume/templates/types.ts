export interface ResumeData {
  title: string;
  name: string;
  profession: string;
  email: string;
  phone: string;
  address: string;
  github?: string;
  linkedin?: string;
  behance?: string;
  photo: string;
  skills: string[];
  education: {
    institution: string;
    degree: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  workExperiences: {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  languages: {
    name: string;
    level: string;
  }[];
}

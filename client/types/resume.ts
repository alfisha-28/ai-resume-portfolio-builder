export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startYear: string;
  endYear: string;
  cgpa: string;
  description: string;
}

export interface Experience {
  id: string;
  company: string;
  jobTitle: string;
  employmentType: string;
  location: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string;
  githubUrl: string;
  liveUrl: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface Certification {
  id: string;
  name: string;
  organization: string;
  issueDate: string;
  credentialId: string;
  credentialUrl: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: "Beginner" | "Intermediate" | "Advanced" | "Native";
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
}

export interface Interest {
  id: string;
  name: string;
}

export type ResumeTemplate = "classic" | "modern" | "minimal" | "professional";


export interface ResumeData {
  title: string;
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  portfolio: string;
  summary: string;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: Skill[];
  certifications: Certification[];
  languages: Language[];
  achievements: Achievement[];
  interests: Interest[];

    template: ResumeTemplate;

}


export interface Resume extends ResumeData {
  id: string;
  createdAt: string;
  updatedAt: string;
}
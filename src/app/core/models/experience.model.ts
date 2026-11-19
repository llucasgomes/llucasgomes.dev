export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  description: string;
  achievements: string[];
  stack: string[];
  isCurrent?: boolean;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  highlights?: string[];
}

export interface ContactInfo {
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  objective: string;
}

export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  location?: string;
  period: string;
  highlights: string[];
  tools?: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location?: string;
  period: string;
  score: string;
}

export interface SkillItem {
  name: string;
  level: number; // 0-100 percentage
  status: 'completed' | 'in-progress' | 'upcoming';
  category: 'core' | 'analytics' | 'database' | 'programming' | 'other';
  institution?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  platform: string;
  description: string;
  highlights: string[];
  tags: string[];
}

export interface Certification {
  id: string;
  name: string;
  institution: string;
  period: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date?: string;
}

export interface ResumeData {
  contact: ContactInfo;
  experience: WorkExperience[];
  education: EducationItem[];
  skills: SkillItem[];
  projects: Project[];
  certifications: Certification[];
  achievements: Achievement[];
  interests: string[];
  languages: { name: string; proficiency: string }[];
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export type ResumeLayout = 'classic' | 'modern' | 'minimalist' | 'creative';

export interface TailorReport {
  matchPercentage: number;
  overallAssessment: string;
  keyAlignments: string[];
  skillGaps: string[];
  resumeTips: string[];
  coverLetter: string;
}

export type ContentType = 'article' | 'blog' | 'thought';

export interface Comment {
  id: string;
  author: string;
  avatar?: string;
  date: string;
  content: string;
  likes: number;
}

export interface ContentItem {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  type: ContentType;
  publishedAt: string;
  readTime: string;
  category: string;
  tags: string[];
  coverImage?: string;
  summary: string;
  content: string;
  likes: number;
  bookmarks: number;
  pinned?: boolean;
  featured?: boolean;
  comments: Comment[];
}

export interface WorkExperience {
  organization: string;
  role: string;
  period: string;
  location: string;
  responsibilities: {
    domain: string;
    items: string[];
  }[];
}

export interface EducationItem {
  degree: string;
  cgpa: string;
  institution: string;
  year: string;
}

export interface AuthorProfile {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  extendedBio: string;
  location: string;
  avatar: string;
  email: string;
  phone: string;
  socialLinks: {
    github: string;
    twitter: string;
    linkedin: string;
    email: string;
  };
  metrics: {
    interventionArea: string;
    farmersTrained: string;
    yearsExperience: string;
    projectsDocumented: string;
  };
  experience: WorkExperience[];
  education: EducationItem[];
  trainings: string[];
  researchInterests: string[];
  currentReading: string[];
  favoriteTools: string[];
}

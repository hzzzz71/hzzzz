export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  fullDetails: string;
  techTags: string[];
  imageUrl: string;
  category: string;
  mockupType: 'mobile' | 'dashboard' | 'ecommerce';
}

export interface TimelineEvent {
  id: string;
  dateRange: string;
  title: string;
  company: string;
  description: string;
}

export interface PortfolioTheme {
  id: string;
  name: string;
  blob1Color: string; // e.g. 'bg-indigo-300' or hex/rgb
  blob2Color: string;
  blob3Color: string;
  blob4Color: string;
  bgGradient: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface PortfolioConfig {
  name: string;
  role: string;
  heroTitle: string;
  aboutText: string;
  resumeUrl: string;
  projects: Project[];
  timeline: TimelineEvent[];
  themeId: string;
}

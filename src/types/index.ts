import { ReactNode } from "react";

export interface MobileMenuItem {
  name: string;
  type: string;
  children?: MobileMenuItem[];
  content?: string;
  isOpen?: boolean;
}

// Project interfaces
export interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image: string;
}

export interface FileItem {
  name: string;
  type: "file" | "folder";
  children?: FileItem[];
  content?: string;
  language?: string;
  isOpen?: boolean;
}

export interface Tab {
  id: string;
  title: string;
  path: string;
  icon?: string;
  component: string;
  params?: Record<string, string>;
}

export interface TabProviderProps {
  children: ReactNode;
}

export interface TabContextType {
  tabs: Tab[];
  activeTabId: string | null;
  addTab: (tab: Tab) => void;
  closeTab: (tabId: string) => void;
  setActiveTab: (tabId: string) => void;
  closeAllTabs: () => void;
}

export interface TabItemProps {
  tab: Tab;
  isActive: boolean;
  onActivate: () => void;
  onClose: () => void;
}

export interface ExplorerProps {
  activeTab: string;
}

export interface ExplorerItem {
  name: string;
  type: string;
  isOpen?: boolean;
  content?: string;
  children?: ExplorerItem[];
}

// Main section interfaces
export interface MainSection {
  title: string;
  align?: string;
  content: Array<{
    highlight?: string;
    link?: string;
    text: string;
  }>;
}

// About section interfaces
export interface AboutData {
  name: string;
  title: string;
  summary: string;
  experience: Array<{
    role: string;
    company: string;
    details: string[];
  }>;
  education: Array<{
    level: string;
    school: string;
  }>;
}

// Chronology interfaces
export interface ChronologyItem {
  year: string;
  company: string;
  event: string;
  color: string;
}

// Skills interfaces
export interface SkillGroup {
  category: string;
  color: string;
  skills: Array<{
    name: string;
    level: number;
  }>;
}

export interface SkillsBarProps {
  name: string;
  level: number;
  index: number;
}

// Define types for our site data structure
export interface SiteData {
  links: {
    github: string;
    linkedin: string;
    email: string;
    phone: string;
  };
  main: MainSection[];
  about: AboutData;
  skills: SkillGroup[];
  chronology: ChronologyItem[];
  projects: Project[];
  sidebar: Array<{ id: string; label: string; path: string; component: string; icon: string; }>;
  explorer: ExplorerItem[];
  [key: string]: unknown;
}

// Define types for our context data
export interface DataContextType {
  site: SiteData | null;
  loading: boolean;
  error: string | null;
}

// Content component interfaces
export interface ContentProps {
  [key: string]: unknown;
}

export interface ProjectDetailContentProps {
  projectId?: string;
}

export interface ProjectDetail {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface UnifiedMarkdownProps {
  // Common props
  fileName?: string;
  content?: string;
  
  // Source type
  sourceType?: 'blog' | 'dsa' | 'project' | 'gallery' | 'general';
  
  // Category and file path information
  category?: string;
  filePath?: string;
  
  // Navigation params
  params?: {
    category?: string;
    fileName?: string;
  };
  
  // Breadcrumb props
  showBreadcrumbs?: boolean;
  customBreadcrumbTitle?: string;
  customBreadcrumbSegments?: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  author: string;
  summary: string;
  content: string;
  tags: string[];
  image?: string;
}

export interface BlogPostContentProps {
  postId?: string;
}

export interface PyodideInstance {
  runPython: (code: string) => unknown;
  [key: string]: unknown;
}

export interface BreadcrumbProps {
  currentPageTitle?: string;
  customSegments?: string[];
  fileName?: string;
}

export interface DSAProblemContentProps {
  fileName: string;
}

// Define types for DSA data
export interface DSAProblem {
  name: string;
  fileName: string;
  difficulty: string;
  problemStatement: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  solution: string[];
  approach: string[];
  complexity: {
    time: string;
    space: string;
  };
}

export interface DSACategory {
  name: string;
  problems: DSAProblem[];
}

export interface DSAContextType {
  dsaData: DSACategory[];
  loading: boolean;
  error: string | null;
  getProblemByFileName: (fileName: string) => DSAProblem | undefined;
}

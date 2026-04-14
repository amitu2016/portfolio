// ─── Resume ────────────────────────────────────────────────────────────────

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  tech: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: number;
}

export interface Resume {
  name: string;
  title: string;
  email: string;
  location: string;
  github: string;
  linkedin: string;
  summary: string;
  experience: Experience[];
  skills: Record<string, string[]>;
  education: Education[];
  certifications: Certification[];
}

// ─── Projects ──────────────────────────────────────────────────────────────

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  category: "backend" | "distributed" | "devops" | "fullstack";
  github?: string;
  demo?: string;
  featured: boolean;
  metrics?: string;
}

// ─── Blog ──────────────────────────────────────────────────────────────────

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  readTime: number; // minutes
  content?: string; // populated for individual post page only
}

// ─── Observability ─────────────────────────────────────────────────────────

export interface MetricDataPoint {
  time: string;
  value: number;
}

export interface ServiceMetric {
  name: string;
  p50: number;
  p95: number;
  p99: number;
  errorRate: number;
  uptime: number;
  rps: number;
}

// ─── Chatbot ───────────────────────────────────────────────────────────────

export interface ResumeChunk {
  id: string;
  text: string;
  keywords: string[];
}

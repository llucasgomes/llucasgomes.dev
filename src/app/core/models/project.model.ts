export type ProjectCategory = 'todos' | 'fullstack-mobile' | 'iot-sistemas' | 'web-apps';

export interface ProjectMetric {
  label: string;
  value: string;
  detail?: string;
}

export interface ProjectArchitecture {
  problem: string;
  decisions: string[];
  techImpact: string[];
  systemHighlights: string[];
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  summary: string;
  featured: boolean;
  colSpan?: 'full' | 'large' | 'medium' | 'small';
  metrics: ProjectMetric[];
  stack: string[];
  architecture: ProjectArchitecture;
  links: {
    github?: string;
    demo?: string;
    docs?: string;
  };
}

export interface GithubRepo {
  id: number;
  name: string;
  fullName: string;
  description: string;
  url: string;
  homepage: string | null;
  stars: number;
  forks: number;
  language: string;
  topics: string[];
  isFork: boolean;
  updatedAt: string;
  pushedAt: string;
}

export interface GithubCacheData {
  timestamp: number;
  repos: GithubRepo[];
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionWeek {
  days: ContributionDay[];
}

export interface GithubContributionsResponse {
  total: {
    lastYear: number;
    [year: string]: number;
  };
  contributions: ContributionDay[];
}

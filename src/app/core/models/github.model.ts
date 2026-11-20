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

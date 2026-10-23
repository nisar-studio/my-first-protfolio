import { useEffect, useState } from "react";

export type Repo = {
  name: string;
  description: string | null;
  htmlUrl: string;
  language: string | null;
  homepage: string | null;
  stars: number;
  updatedAt: string;
  fork: boolean;
};

type GitHubApiRepo = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  homepage: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
};

const ENDPOINT =
  "https://api.github.com/users/nisar-studio/repos?per_page=100&sort=updated";

/** Verified repositories, used when the public API is rate limited or offline. */
export const fallbackRepos: Repo[] = [
  {
    name: "Finora-AI",
    description: "Personal AI financial coach with deterministic metrics and grounded Gemini answers.",
    htmlUrl: "https://github.com/nisar-studio/Finora-AI",
    language: "TypeScript",
    homepage: "https://finora-ai-eta.vercel.app",
    stars: 1,
    updatedAt: "2026-09-21T03:53:37Z",
    fork: false,
  },
  {
    name: "Bynovix-AI",
    description: "Enterprise intelligence suite spanning analytics, forecasting, AI insight and governance.",
    htmlUrl: "https://github.com/nisar-studio/Bynovix-AI",
    language: "HTML",
    homepage: "https://bynovix-ai.netlify.app",
    stars: 1,
    updatedAt: "2026-09-14T10:47:09Z",
    fork: false,
  },
  {
    name: "ResearchAI",
    description: "Turn any PDF into an AI study workspace with RAG chat, flashcards, quizzes and mind maps.",
    htmlUrl: "https://github.com/nisar-studio/ResearchAI",
    language: "JavaScript",
    homepage: "https://research-ai-lilac.vercel.app",
    stars: 2,
    updatedAt: "2026-08-05T15:20:51Z",
    fork: false,
  },
  {
    name: "Complyflow",
    description: "Autonomous AI compliance agent built with Google ADK, Gemini and FastAPI.",
    htmlUrl: "https://github.com/nisar-studio/Complyflow",
    language: "Python",
    homepage: null,
    stars: 1,
    updatedAt: "2026-09-07T12:59:02Z",
    fork: false,
  },
  {
    name: "Autonomous-Retail-Supply-Chain-Agent-Team_Codex",
    description: "Closed-loop multi-agent supply chain recovery system built for a hackathon.",
    htmlUrl:
      "https://github.com/nisar-studio/Autonomous-Retail-Supply-Chain-Agent-Team_Codex",
    language: "Python",
    homepage: null,
    stars: 1,
    updatedAt: "2026-09-13T13:08:20Z",
    fork: false,
  },
];

type State = {
  repos: Repo[];
  status: "loading" | "ready" | "error";
};

export function useGitHubRepos(): State {
  const [state, setState] = useState<State>({ repos: [], status: "loading" });

  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 9000);
    let cancelled = false;

    fetch(ENDPOINT, {
      signal: controller.signal,
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((response) => {
        if (!response.ok) throw new Error(`GitHub responded ${response.status}`);
        return response.json() as Promise<GitHubApiRepo[]>;
      })
      .then((data) => {
        if (cancelled) return;
        const repos: Repo[] = data
          .filter((repo) => !repo.fork)
          .map((repo) => ({
            name: repo.name,
            description: repo.description,
            htmlUrl: repo.html_url,
            language: repo.language,
            homepage: repo.homepage,
            stars: repo.stargazers_count,
            updatedAt: repo.pushed_at,
            fork: repo.fork,
          }));
        setState({ repos: repos.length > 0 ? repos : fallbackRepos, status: "ready" });
      })
      .catch(() => {
        if (cancelled) return;
        setState({ repos: fallbackRepos, status: "error" });
      })
      .finally(() => window.clearTimeout(timeout));

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  return state;
}

export function formatRelativeDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const days = Math.floor((Date.now() - date.getTime()) / 86_400_000);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

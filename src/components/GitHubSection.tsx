import { useMemo } from "react";
import { ArrowUpRight, Github, Star } from "lucide-react";
import { profile } from "../data/profile";
import { formatRelativeDate, useGitHubRepos } from "../lib/github";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

const languageColors: Record<string, string> = {
  Python: "#3572A5",
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Java: "#b07219",
  C: "#555555",
};

function RepoSkeleton() {
  return (
    <ul className="divide-y divide-line" aria-hidden="true">
      {[0, 1, 2, 3].map((index) => (
        <li key={index} className="flex animate-pulse flex-col gap-2 p-5">
          <div className="h-3.5 w-40 rounded bg-panel-strong" />
          <div className="h-3 w-full max-w-sm rounded bg-panel-strong" />
          <div className="h-2.5 w-24 rounded bg-panel-strong" />
        </li>
      ))}
    </ul>
  );
}

export function GitHubSection() {
  const { repos, status } = useGitHubRepos();
  const visible = repos.slice(0, 6);

  const languages = useMemo(() => {
    const counts = new Map<string, number>();
    repos.forEach((repo) => {
      if (repo.language) counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
    });
    const total = Array.from(counts.values()).reduce((sum, count) => sum + count, 0);
    return {
      total,
      items: Array.from(counts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 4),
    };
  }, [repos]);

  return (
    <Section
      id="github"
      eyebrow="06 — Open source"
      title={
        <>
          On <span className="font-serif italic font-normal text-muted">GitHub</span>
        </>
      }
      description="Repositories are fetched live from the GitHub API, so names, languages and activity here stay current. If the API is unavailable, verified repository data is shown instead."
    >
      <div className="grid gap-4 lg:grid-cols-[0.72fr_1.28fr]">
        <Reveal>
          <div className="panel flex h-full flex-col justify-between gap-6 p-6 sm:p-7">
            <div>
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-line-strong bg-panel-strong text-lg font-semibold tracking-[-0.04em] text-ink">
                  MN<span className="text-violet">.</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">{profile.name}</p>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-0.5 inline-flex items-center gap-1 text-[0.78rem] text-muted transition-colors hover:text-ink"
                  >
                    @{profile.githubHandle}
                    <ArrowUpRight aria-hidden="true" size={11} />
                    <span className="sr-only">(opens GitHub in a new tab)</span>
                  </a>
                </div>
              </div>
              <p className="mt-5 text-[0.84rem] leading-relaxed text-muted">
                AI-integrated applications, agentic systems and full-stack builds — each repository has
                its own README covering setup, architecture and known limitations.
              </p>
              <dl className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-line bg-panel px-3 py-2.5">
                  <dt className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-faint">
                    Public repos
                  </dt>
                  <dd className="mt-1 text-lg font-medium tracking-[-0.02em] text-ink">
                    {status === "loading" ? "—" : repos.length}
                  </dd>
                </div>
                <div className="rounded-xl border border-line bg-panel px-3 py-2.5">
                  <dt className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-faint">
                    Live demos
                  </dt>
                  <dd className="mt-1 text-lg font-medium tracking-[-0.02em] text-ink">
                    {status === "loading" ? "—" : repos.filter((repo) => repo.homepage).length}
                  </dd>
                </div>
              </dl>

              {status !== "loading" && languages.total > 0 ? (
                <div className="mt-5 border-t border-line pt-4">
                  <p className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-faint">
                    By primary language
                  </p>
                  <div
                    className="mt-2.5 flex h-1.5 overflow-hidden rounded-full bg-panel-strong"
                    role="img"
                    aria-label={`Primary language split across ${languages.total} repositories`}
                  >
                    {languages.items.map(([language, count]) => (
                      <span
                        key={language}
                        style={{
                          width: `${(count / languages.total) * 100}%`,
                          backgroundColor: languageColors[language] ?? "#8b8b95",
                        }}
                      />
                    ))}
                  </div>
                  <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5">
                    {languages.items.map(([language, count]) => (
                      <li
                        key={language}
                        className="inline-flex items-center gap-1.5 text-[0.7rem] text-muted"
                      >
                        <span
                          aria-hidden="true"
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: languageColors[language] ?? "#8b8b95" }}
                        />
                        {language}
                        <span className="font-mono text-[0.6rem] text-faint">{count}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
            <a href={profile.github} target="_blank" rel="noreferrer noopener" className="btn btn-ghost w-full">
              <Github aria-hidden="true" size={15} />
              View GitHub profile
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="panel h-full overflow-hidden">
            <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-faint">
                Repositories
              </p>
              <span className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-faint">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    status === "error" ? "bg-amber-400" : status === "loading" ? "bg-muted" : "bg-cyan"
                  }`}
                  aria-hidden="true"
                />
                {status === "loading" ? "syncing" : status === "error" ? "cached" : "live"}
              </span>
            </div>

            {status === "loading" ? <RepoSkeleton /> : null}

            {status !== "loading" ? (
              <ul className="divide-y divide-line">
                {visible.map((repo) => (
                  <li key={repo.name}>
                    <a
                      href={repo.htmlUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group flex items-start justify-between gap-4 px-5 py-4 transition-colors hover:bg-panel"
                    >
                      <div className="min-w-0">
                        <p className="flex min-w-0 items-center gap-2 text-[0.88rem] font-medium tracking-[-0.01em] text-ink">
                          <span className="min-w-0 truncate">{repo.name}</span>
                          {repo.stars > 0 ? (
                            <span className="inline-flex shrink-0 items-center gap-1 text-[0.68rem] font-normal text-faint">
                              <Star aria-hidden="true" size={10} />
                              {repo.stars}
                              <span className="sr-only">stars</span>
                            </span>
                          ) : null}
                        </p>
                        <p className="mt-1 line-clamp-2 text-[0.78rem] leading-relaxed text-muted">
                          {repo.description?.trim() || "No description provided yet — see the README for details."}
                        </p>
                        <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-faint">
                          {repo.language ? (
                            <span className="inline-flex items-center gap-1.5">
                              <span
                                aria-hidden="true"
                                className="h-1.5 w-1.5 rounded-full"
                                style={{
                                  backgroundColor: languageColors[repo.language] ?? "#8b8b95",
                                }}
                              />
                              {repo.language}
                            </span>
                          ) : null}
                          <span>updated {formatRelativeDate(repo.updatedAt)}</span>
                          {repo.homepage ? <span className="text-cyan/80">deployed</span> : null}
                        </p>
                      </div>
                      <ArrowUpRight
                        aria-hidden="true"
                        size={15}
                        className="mt-1 shrink-0 text-faint transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-4">
              {status === "error" ? (
                <p className="text-[0.72rem] text-warn">
                  Live GitHub data couldn&apos;t be loaded — showing verified repositories.
                </p>
              ) : (
                <p className="text-[0.72rem] text-faint">Public data from the GitHub REST API.</p>
              )}
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex items-center gap-1.5 text-[0.76rem] font-medium text-muted transition-colors hover:text-ink"
              >
                View all repositories
                <ArrowUpRight
                  aria-hidden="true"
                  size={12}
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
                <span className="sr-only">(opens GitHub in a new tab)</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

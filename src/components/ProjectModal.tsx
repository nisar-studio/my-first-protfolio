import { useEffect, useRef } from "react";
import { ArrowUpRight, ExternalLink, Github, X } from "lucide-react";
import type { Project } from "../data/projects";
import { useBodyScrollLock } from "../lib/hooks";
import { ProjectArtwork } from "./ProjectArt";

type ProjectModalProps = {
  project: Project;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useBodyScrollLock(true);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-2xl border border-line bg-bg shadow-[0_-20px_80px_rgba(0,0,0,0.5)] sm:rounded-2xl"
      >
        <div className="relative">
          <div className="aspect-[16/10] w-full overflow-hidden border-b border-line bg-[#0a0a12] sm:aspect-[16/7]">
            <ProjectArtwork visual={project.visual} />
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white/85 shadow-lg backdrop-blur transition-colors hover:bg-black/75 hover:text-white"
          >
            <X aria-hidden="true" size={16} />
          </button>
        </div>

        <div className="border-b border-line px-5 pb-6 pt-5 sm:px-8 sm:pt-6">
          <div className="flex flex-wrap items-center gap-1.5">
            {project.categories.map((category) => (
              <span key={category} className="tag">
                {category}
              </span>
            ))}
            <span className="ml-1 font-mono text-[0.65rem] tracking-[0.08em] text-faint">
              {project.year}
            </span>
          </div>
          <h2
            id="project-modal-title"
            className="mt-3 text-2xl font-medium tracking-[-0.03em] text-ink sm:text-3xl"
          >
            {project.name}
          </h2>
          <p className="mt-1 text-sm text-muted">{project.subtitle}</p>
        </div>

        <div className="space-y-8 p-5 sm:p-8">
          <div className="flex flex-wrap gap-2">
            <a href={project.repo} target="_blank" rel="noreferrer noopener" className="btn btn-primary">
              <Github aria-hidden="true" size={15} />
              Source code
              <span className="sr-only">for {project.name} (opens in a new tab)</span>
            </a>
            {project.live ? (
              <a href={project.live} target="_blank" rel="noreferrer noopener" className="btn btn-ghost">
                <ExternalLink aria-hidden="true" size={15} />
                Live demo
                <span className="sr-only">for {project.name} (opens in a new tab)</span>
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full border border-line border-dashed px-4 py-2 text-[0.8rem] text-faint">
                No public deployment
              </span>
            )}
          </div>

          {project.liveNote ? (
            <p className="rounded-lg border border-line bg-panel px-4 py-3 text-[0.78rem] leading-relaxed text-muted">
              <span className="font-medium text-ink/80">Demo note:</span> {project.liveNote}
            </p>
          ) : null}

          <section>
            <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-faint">Overview</h3>
            <p className="mt-3 text-[0.92rem] leading-relaxed text-ink/90">{project.summary}</p>
          </section>

          <section>
            <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-faint">
              The problem
            </h3>
            <p className="mt-3 text-[0.92rem] leading-relaxed text-muted">{project.problem}</p>
          </section>

          <section>
            <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-faint">
              What it does
            </h3>
            <ul className="mt-3 space-y-2.5">
              {project.features.map((feature) => (
                <li key={feature} className="flex gap-3 text-[0.88rem] leading-relaxed text-muted">
                  <span aria-hidden="true" className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-violet" />
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-faint">
              How it&apos;s built
            </h3>
            <ol className="mt-3 space-y-3">
              {project.implementation.map((item, index) => (
                <li key={item} className="flex gap-3 text-[0.88rem] leading-relaxed text-muted">
                  <span className="mt-0.5 font-mono text-[0.7rem] text-violet">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item}
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-faint">Stack</h3>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <li key={tech} className="tag">
                  {tech}
                </li>
              ))}
            </ul>
          </section>

          {project.limits ? (
            <p className="rounded-lg border border-line bg-panel px-4 py-3 text-[0.78rem] leading-relaxed text-muted">
              <span className="font-medium text-ink/80">Scope and limits:</span> {project.limits}
            </p>
          ) : null}

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center gap-2 text-[0.8rem] text-muted transition-colors hover:text-ink"
            >
              <Github aria-hidden="true" size={14} />
              {project.repoName}
              <ArrowUpRight
                aria-hidden="true"
                size={13}
                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
            <button type="button" onClick={onClose} className="text-[0.8rem] font-medium text-muted hover:text-ink">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

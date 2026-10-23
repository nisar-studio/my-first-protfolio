import { useState } from "react";
import { ArrowUpRight, Check, ExternalLink, Github } from "lucide-react";
import { projects, type Project } from "../data/projects";
import { profile } from "../data/profile";
import { ProjectArtwork } from "./ProjectArt";
import { ProjectModal } from "./ProjectModal";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

function ProjectTags({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {project.categories.map((category) => (
        <span key={category} className="tag">
          {category}
        </span>
      ))}
      <span className="ml-1 font-mono text-[0.65rem] tracking-[0.08em] text-faint">{project.year}</span>
    </div>
  );
}

function CardActions({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <div className="flex items-center justify-between gap-3 border-t border-line pt-4">
      <button
        type="button"
        onClick={onOpen}
        className="group/btn inline-flex items-center gap-1.5 text-[0.8rem] font-medium text-ink"
      >
        Case study
        <ArrowUpRight
          aria-hidden="true"
          size={14}
          className="text-violet transition-transform duration-200 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
        />
        <span className="sr-only">for {project.name}</span>
      </button>
      <div className="flex items-center gap-1">
        <a
          href={project.repo}
          target="_blank"
          rel="noreferrer noopener"
          className="icon-link h-8 w-8"
          aria-label={`View ${project.name} source code on GitHub (opens in a new tab)`}
        >
          <Github aria-hidden="true" size={14} />
        </a>
        {project.live ? (
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer noopener"
            className="icon-link h-8 w-8 border-violet/30 text-violet"
            aria-label={`Open the live ${project.name} demo (opens in a new tab)`}
          >
            <ExternalLink aria-hidden="true" size={14} />
          </a>
        ) : null}
      </div>
    </div>
  );
}

export function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const featured = projects.find((project) => project.featured) ?? projects[0];
  const rest = projects.filter((project) => project.id !== featured.id);

  const closeModal = () => setActiveProject(null);

  return (
    <>
      <Section
        id="projects"
        eyebrow="03 — Projects"
        title={
          <>
            Selected <span className="font-serif italic font-normal text-muted">projects</span>
          </>
        }
        description="Five builds, each solving a problem I actually ran into. Three have working deployments; the rest run locally from a documented repository."
        aside={
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer noopener"
            className="group inline-flex items-center gap-2 text-[0.8rem] font-medium text-muted transition-colors hover:text-ink"
          >
            <Github aria-hidden="true" size={15} />
            All repositories
            <ArrowUpRight
              aria-hidden="true"
              size={13}
              className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
            <span className="sr-only">(opens GitHub in a new tab)</span>
          </a>
        }
      >
        <div className="space-y-4">
          <Reveal>
            <article className="panel project-card group grid overflow-hidden hover:border-line-strong lg:grid-cols-[1.08fr_0.92fr]">
              <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-[#0a0a12] lg:aspect-auto lg:min-h-[24rem] lg:border-b-0 lg:border-r">
                <div className="absolute inset-0 transition-transform duration-[900ms] ease-out group-hover:scale-[1.025]">
                  <ProjectArtwork visual={featured.visual} />
                </div>
              </div>
              <div className="flex flex-col justify-between gap-6 p-6 sm:p-8">
                <div>
                  <ProjectTags project={featured} />
                  <h3 className="mt-4 text-2xl font-medium tracking-[-0.03em] text-ink sm:text-[1.7rem]">
                    <button type="button" onClick={() => setActiveProject(featured)} className="text-left">
                      {featured.name}
                    </button>
                  </h3>
                  <p className="mt-1 text-[0.82rem] text-violet">{featured.subtitle}</p>
                  <p className="mt-4 text-[0.92rem] leading-relaxed text-muted">{featured.summary}</p>
                  <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Featured project technologies">
                    {featured.stack.slice(0, 6).map((tech) => (
                      <li key={tech} className="tag">
                        {tech}
                      </li>
                    ))}
                    <li className="tag">+{featured.stack.length - 6} more</li>
                  </ul>
                  {featured.highlights ? (
                    <ul className="mt-5 space-y-2 border-t border-line pt-4">
                      {featured.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-2 text-[0.8rem] leading-relaxed text-muted">
                          <Check aria-hidden="true" size={13} className="mt-0.5 shrink-0 text-cyan" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
                <CardActions project={featured} onOpen={() => setActiveProject(featured)} />
              </div>
            </article>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {rest.map((project, index) => (
              <Reveal key={project.id} delay={index * 70}>
                <article className="panel project-card group flex h-full flex-col overflow-hidden hover:border-line-strong">
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-[#0a0a12]">
                    <div className="absolute inset-0 transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]">
                      <ProjectArtwork visual={project.visual} />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col justify-between gap-5 p-5 sm:p-6">
                    <div>
                      <ProjectTags project={project} />
                      <h3 className="mt-3 text-lg font-medium tracking-[-0.02em] text-ink">
                        <button type="button" onClick={() => setActiveProject(project)} className="text-left">
                          {project.name}
                        </button>
                      </h3>
                      <p className="mt-1 text-[0.78rem] text-muted">{project.subtitle}</p>
                      <p className="mt-3 line-clamp-3 text-[0.84rem] leading-relaxed text-muted">
                        {project.summary}
                      </p>
                      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`${project.name} technologies`}>
                        {project.stack.slice(0, 4).map((tech) => (
                          <li key={tech} className="tag">
                            {tech}
                          </li>
                        ))}
                        {project.stack.length > 4 ? <li className="tag">+{project.stack.length - 4}</li> : null}
                      </ul>
                    </div>
                    <CardActions project={project} onOpen={() => setActiveProject(project)} />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {activeProject ? <ProjectModal project={activeProject} onClose={closeModal} /> : null}
    </>
  );
}

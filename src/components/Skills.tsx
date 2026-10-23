import { BrainCircuit, Code2, Layers, Network, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { skillGroups } from "../data/profile";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

const icons: LucideIcon[] = [Code2, BrainCircuit, Network, Layers, Wrench];

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="02 — Skills"
      title={
        <>
          Tools I <span className="font-serif italic font-normal text-muted">build</span> with
        </>
      }
      description="Drawn from what the repositories actually import and deploy — every item below appears in a project on this page or on my GitHub profile."
      aside={
        <p className="max-w-[16rem] text-[0.72rem] leading-relaxed text-faint">
          No proficiency percentages. Confidence comes from the projects, not a progress bar.
        </p>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, index) => {
          const Icon = icons[index] ?? Code2;
          const wide = index === 1;
          return (
            <Reveal
              key={group.title}
              delay={index * 60}
              className={wide ? "sm:col-span-2 lg:col-span-1" : ""}
            >
              <article className="panel group h-full p-6 transition-colors duration-300 hover:border-line-strong">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-[0.95rem] font-semibold tracking-[-0.01em] text-ink">
                      {group.title}
                    </h3>
                    <p className="mt-1 text-[0.75rem] text-faint">{group.caption}</p>
                  </div>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-line bg-panel text-muted transition-colors duration-300 group-hover:border-violet/40 group-hover:text-violet">
                    <Icon aria-hidden="true" size={16} strokeWidth={1.75} />
                  </span>
                </div>
                <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={`${group.title} technologies`}>
                  {group.items.map((item) => (
                    <li key={item} className="tag">
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}

        <Reveal delay={320}>
          <aside className="panel flex h-full flex-col justify-between gap-6 border-violet/25 bg-violet-soft p-6">
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-violet">
                Still learning
              </p>
              <p className="mt-3 text-[0.9rem] leading-relaxed text-ink/90">
                Deep learning architectures, model evaluation, and production-scale system design are
                the next things I&apos;m working through — I&apos;d rather name them as goals than list
                them as skills.
              </p>
            </div>
            <p className="text-[0.72rem] leading-relaxed text-muted">
              Everything else on this page was used to build, test, or ship one of the five projects
              below.
            </p>
          </aside>
        </Reveal>
      </div>
    </Section>
  );
}

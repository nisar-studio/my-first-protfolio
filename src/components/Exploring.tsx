import { ArrowUpRight, Compass } from "lucide-react";
import { exploring, profile } from "../data/profile";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Exploring() {
  return (
    <Section
      id="focus"
      eyebrow="04 — Currently"
      title={
        <>
          What I&apos;m <span className="font-serif italic font-normal text-muted">exploring</span>
        </>
      }
      description="The areas I'm actively building in — each one shows up in at least one project above, not just in a reading list."
    >
      <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <div className="panel relative flex h-full flex-col justify-between overflow-hidden p-6 sm:p-8">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(90%_70%_at_0%_0%,rgba(149,124,255,0.16),transparent_70%)]"
            />
            <div className="relative">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-violet/30 bg-violet-soft text-violet">
                <Compass aria-hidden="true" size={16} strokeWidth={1.75} />
              </span>
              <p className="mt-6 text-balance font-serif text-[1.55rem] leading-[1.25] text-ink sm:text-[1.8rem]">
                “A feature only looks finished when it genuinely works.”
              </p>
              <p className="mt-4 max-w-xs text-[0.82rem] leading-relaxed text-muted">
                The principle behind every project here — including the parts that are documented as
                unfinished rather than dressed up.
              </p>

              <div className="mt-7 border-t border-line pt-5">
                <p className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-faint">
                  The loop I keep building
                </p>
                <div className="mt-3 grid grid-cols-3 gap-1.5">
                  {["Monitor", "Detect", "Plan", "Act", "Verify", "Adapt"].map((step, index) => (
                    <div key={step} className="rounded-lg border border-line bg-panel px-2 py-1.5">
                      <span className="font-mono text-[0.55rem] text-faint">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="mt-0.5 text-[0.72rem] leading-tight text-ink/80">{step}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-[0.7rem] leading-relaxed text-faint">
                  Replanning when an action fails is the part that matters — the loop, not the answer.
                </p>
              </div>
            </div>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              className="group relative mt-8 inline-flex items-center gap-2 text-[0.8rem] font-medium text-ink"
            >
              See what I&apos;m building now
              <ArrowUpRight
                aria-hidden="true"
                size={14}
                className="text-violet transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
              <span className="sr-only">(opens GitHub in a new tab)</span>
            </a>
          </div>
        </Reveal>

        <div className="panel overflow-hidden">
          <ul className="divide-y divide-line">
            {exploring.map((area, index) => (
              <li key={area.title}>
                <Reveal delay={index * 60}>
                  <div className="group flex gap-4 p-5 transition-colors hover:bg-panel sm:p-6">
                    <span className="mt-0.5 font-mono text-[0.68rem] tracking-[0.08em] text-faint">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-[0.95rem] font-medium tracking-[-0.01em] text-ink">
                        {area.title}
                      </h3>
                      <p className="mt-1.5 text-[0.83rem] leading-relaxed text-muted">{area.body}</p>
                      <p className="mt-2.5 font-mono text-[0.63rem] uppercase tracking-[0.14em] text-violet/80">
                        {area.signal}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

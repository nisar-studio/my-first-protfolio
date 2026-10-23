import { Award, GraduationCap } from "lucide-react";
import { credentials } from "../data/profile";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

const icons = [GraduationCap, Award];

export function Credentials() {
  return (
    <Section
      id="credentials"
      eyebrow="05 — Background"
      title={
        <>
          Education &amp; <span className="font-serif italic font-normal text-muted">certifications</span>
        </>
      }
      description="The formal side of the work. Dates and titles are listed exactly as they appear in my profile."
    >
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute bottom-4 left-[1.15rem] top-4 w-px bg-gradient-to-b from-violet/50 via-line to-transparent sm:left-[1.4rem]"
        />
        <ol className="space-y-4">
          {credentials.map((credential, index) => {
            const Icon = icons[index] ?? Award;
            return (
              <li key={credential.title}>
                <Reveal delay={index * 80}>
                  <div className="relative flex gap-5">
                    <span className="relative z-10 mt-6 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line-strong bg-bg text-violet sm:h-11 sm:w-11">
                      <Icon aria-hidden="true" size={16} strokeWidth={1.75} />
                    </span>
                    <div className="panel flex-1 p-6 sm:p-7">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-faint">
                            {credential.kind}
                          </p>
                          <h3 className="mt-2 text-[1.02rem] font-medium tracking-[-0.015em] text-ink sm:text-[1.1rem]">
                            {credential.title}
                          </h3>
                          <p className="mt-1 text-[0.84rem] text-muted">{credential.org}</p>
                        </div>
                        <span className="inline-flex items-center rounded-full border border-line bg-panel px-3 py-1 font-mono text-[0.68rem] tracking-[0.06em] text-muted">
                          {credential.meta}
                        </span>
                      </div>
                      <p className="mt-4 max-w-2xl text-[0.85rem] leading-relaxed text-muted">
                        {credential.detail}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}

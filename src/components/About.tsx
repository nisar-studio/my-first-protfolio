import { ArrowUpRight, Github, GraduationCap, Linkedin, Mail, MapPin, Sparkles } from "lucide-react";
import { about, profile } from "../data/profile";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

const infoIcons = [MapPin, GraduationCap, Sparkles, Sparkles];

export function About() {
  return (
    <Section
      id="about"
      eyebrow="01 — About"
      title={
        <>
          A little about <span className="font-serif italic font-normal text-muted">me</span>
        </>
      }
      description="An AI and machine learning student who would rather ship a working version and learn from it than describe a perfect one."
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <div className="space-y-5">
            {about.paragraphs.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 24)} delay={index * 70}>
                <p
                  className={
                    index === 0
                      ? "text-[1.05rem] leading-[1.75] text-ink/90 sm:text-[1.12rem]"
                      : "text-[0.95rem] leading-[1.8] text-muted"
                  }
                >
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={220}>
            <div className="mt-8 flex flex-wrap gap-2">
              {about.interests.map((interest) => (
                <span key={interest} className="tag">
                  {interest}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={280}>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-6">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex items-center gap-2 text-sm font-medium text-ink"
              >
                <Github aria-hidden="true" size={15} />
                nisar-studio
                <ArrowUpRight
                  aria-hidden="true"
                  size={13}
                  className="text-faint transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
                <span className="sr-only">(opens GitHub in a new tab)</span>
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex items-center gap-2 text-sm font-medium text-ink"
              >
                <Linkedin aria-hidden="true" size={15} />
                LinkedIn
                <ArrowUpRight
                  aria-hidden="true"
                  size={13}
                  className="text-faint transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
                <span className="sr-only">(opens LinkedIn in a new tab)</span>
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex items-center gap-2 text-sm font-medium text-ink"
              >
                <Mail aria-hidden="true" size={15} />
                Email
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={160} className="lg:col-span-5">
          <aside aria-label="Profile details" className="panel overflow-hidden">
            <div className="relative border-b border-line p-6">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(70%_120%_at_15%_0%,rgba(149,124,255,0.16),transparent_70%)]"
              />
              <div className="relative flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-line-strong bg-panel-strong text-lg font-semibold tracking-[-0.04em] text-ink">
                  MN<span className="text-violet">.</span>
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold tracking-[-0.01em] text-ink">
                    {profile.name}
                  </p>
                  <p className="mt-0.5 text-[0.78rem] leading-snug text-muted">{profile.headline}</p>
                </div>
              </div>
            </div>

            <dl className="divide-y divide-line">
              {about.info.map((item, index) => {
                const Icon = infoIcons[index] ?? Sparkles;
                return (
                  <div key={item.label} className="px-6 py-4">
                    <dt className="flex items-center gap-2.5">
                      <Icon aria-hidden="true" size={14} className="shrink-0 text-faint" />
                      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-faint">
                        {item.label}
                      </span>
                    </dt>
                    <dd className="mt-1.5 pl-[1.5rem] text-[0.83rem] leading-relaxed text-ink/90">
                      {item.value}
                    </dd>
                  </div>
                );
              })}
            </dl>

            <div className="border-t border-line px-6 py-4">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 text-[0.8rem] font-medium text-violet transition-opacity hover:opacity-80"
              >
                Start a conversation
                <ArrowUpRight
                  aria-hidden="true"
                  size={14}
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </aside>
        </Reveal>
      </div>
    </Section>
  );
}

import { ArrowRight, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "../data/profile";
import type { Theme } from "../lib/hooks";
import { AndroidStage } from "./AndroidStage";
import { Reveal } from "./Reveal";

const socials = [
  { label: "GitHub", href: profile.github, Icon: Github },
  { label: "LinkedIn", href: profile.linkedin, Icon: Linkedin },
  { label: "Email", href: `mailto:${profile.email}`, Icon: Mail },
];

type Props = {
  theme: Theme;
};

export function Hero({ theme }: Props) {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20 md:pt-32 md:pb-24"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-grid mask-fade absolute inset-0 opacity-60" />
        <div className="hero-aurora absolute left-1/2 top-[42%] h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute -right-24 top-1/4 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(86,224,211,0.09),transparent_65%)] blur-2xl" />
        <span className="absolute right-[2%] top-1/2 hidden -translate-y-1/2 select-none text-[22vw] font-semibold leading-none tracking-[-0.08em] text-ink/[0.02] lg:block">
          MN.
        </span>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <div className="shell relative grid w-full items-center gap-8 lg:grid-cols-[0.94fr_1.06fr] lg:gap-4">
        <div className="hero-copy order-last lg:order-first">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-3 py-1.5 text-[0.7rem] font-medium tracking-[0.02em] text-muted backdrop-blur-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan" />
              </span>
              {profile.availability}
            </span>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.78rem]">
              <span className="font-medium tracking-[-0.01em] text-ink">{profile.name}</span>
              <span aria-hidden="true" className="h-3 w-px bg-line-strong" />
              <span className="text-muted">AI &amp; ML Student</span>
              <span aria-hidden="true" className="hidden h-3 w-px bg-line-strong sm:block" />
              <span className="hidden text-muted sm:inline">Full-Stack Developer</span>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <h1
              id="hero-heading"
              className="text-balance mt-4 max-w-[42rem] text-[2.6rem] font-medium leading-[0.98] tracking-[-0.045em] text-ink sm:text-6xl lg:text-[4rem]"
            >
              Building{" "}
              <em className="bg-gradient-to-r from-violet via-[#b7a4ff] to-cyan bg-clip-text font-serif font-normal italic tracking-[-0.02em] text-transparent">
                Intelligent
              </em>{" "}
              Experiences with AI &amp; Code.
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-6 max-w-xl text-[0.98rem] leading-[1.7] text-muted sm:text-[1.02rem]">
              {profile.heroDescription}
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#projects" className="btn btn-primary group">
                Explore My Projects
                <ArrowRight
                  aria-hidden="true"
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </a>
              <a href="#contact" className="btn btn-ghost">
                Get in Touch
                <ArrowUpRight aria-hidden="true" size={16} />
              </a>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <ul className="flex items-center gap-4">
                {socials.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith("mailto:") ? undefined : "_blank"}
                      rel={href.startsWith("mailto:") ? undefined : "noreferrer noopener"}
                      className="group inline-flex items-center gap-2 text-[0.8rem] font-medium text-muted transition-colors hover:text-ink"
                    >
                      <Icon aria-hidden="true" size={15} strokeWidth={1.75} />
                      {label}
                      <span className="sr-only">
                        {href.startsWith("mailto:") ? "" : "(opens in a new tab)"}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <span aria-hidden="true" className="hidden h-3 w-px bg-line-strong sm:block" />
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 text-[0.8rem] text-muted transition-colors hover:text-ink"
              >
                <span className="text-faint">Latest build</span>
                Finora AI
                <ArrowUpRight
                  aria-hidden="true"
                  size={13}
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={60} className="relative order-first lg:order-last">
          <div className="hero-stage">
            <AndroidStage theme={theme} className="h-full w-full" />
          </div>
        </Reveal>
      </div>

      <a
        href="#about"
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        aria-label="Scroll to the about section"
      >
        <span className="font-mono text-[0.58rem] uppercase tracking-[0.24em] text-faint">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-gradient-to-b from-line-strong to-transparent">
          <span className="scroll-cue-dot" />
        </span>
      </a>
    </section>
  );
}

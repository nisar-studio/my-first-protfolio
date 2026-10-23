import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "../data/profile";

const links = [
  { label: "GitHub", href: profile.github, Icon: Github, external: true },
  { label: "LinkedIn", href: profile.linkedin, Icon: Linkedin, external: true },
  { label: "Email", href: `mailto:${profile.email}`, Icon: Mail, external: false },
];

export function Footer() {
  const year = new Date().getFullYear();

  const backToTop = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <footer className="border-t border-line">
      <div className="shell py-12 md:py-14">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
          <div>
            <a href="#home" className="text-lg font-semibold tracking-[-0.03em] text-ink">
              {profile.wordmark}
            </a>
            <p className="mt-2 max-w-xs text-[0.82rem] leading-relaxed text-muted">
              AI &amp; machine learning student building grounded, useful software.
            </p>
          </div>

          <div className="flex flex-col gap-4 md:items-end">
            <ul className="flex items-center gap-2">
              {links.map(({ label, href, Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer noopener" : undefined}
                    className="icon-link"
                    aria-label={label === "Email" ? "Email Mohammed Nisaruddin" : `${label} (opens in a new tab)`}
                  >
                    <Icon aria-hidden="true" size={16} strokeWidth={1.75} />
                  </a>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={backToTop}
              className="group inline-flex items-center gap-2 text-[0.78rem] font-medium text-muted transition-colors hover:text-ink"
            >
              Back to top
              <ArrowUp
                aria-hidden="true"
                size={14}
                className="transition-transform duration-200 group-hover:-translate-y-0.5"
              />
            </button>
          </div>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-line pt-6 text-[0.72rem] text-faint sm:flex-row sm:items-center">
          <p>
            © {year} {profile.name}. All rights reserved.
          </p>
          <p>
            Built with React, TypeScript &amp; Tailwind CSS ·{" "}
            <a href={`mailto:${profile.email}`} className="transition-colors hover:text-muted">
              {profile.email}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

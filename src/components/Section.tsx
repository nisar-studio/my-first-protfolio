import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionProps = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
  aside?: ReactNode;
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
  aside,
}: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={`scroll-mt-28 py-20 md:py-28 ${className}`}>
      <div className="shell">
        <Reveal>
          <div className="flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">{eyebrow}</p>
              <h2
                id={`${id}-heading`}
                className="mt-4 text-3xl font-medium leading-[1.08] tracking-[-0.03em] text-ink sm:text-4xl md:text-[2.75rem]"
              >
                {title}
              </h2>
              {description ? (
                <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-muted">{description}</p>
              ) : null}
            </div>
            {aside ? <div className="shrink-0">{aside}</div> : null}
          </div>
        </Reveal>
        <div className="mt-12 md:mt-16">{children}</div>
      </div>
    </section>
  );
}

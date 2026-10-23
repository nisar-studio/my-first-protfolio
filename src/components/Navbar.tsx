import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { profile } from "../data/profile";
import { useActiveSection, useScrolled, type Theme } from "../lib/hooks";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "credentials", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

const sectionIds = links.map((link) => link.id);

type NavbarProps = {
  theme: Theme;
  onToggleTheme: () => void;
};

export function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(sectionIds);
  const scrolled = useScrolled();
  const progressRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${ratio})`;
      }
    };
    const onScroll = () => {
      if (frame === 0) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-line backdrop-blur-xl" : "border-b border-transparent"
      }`}
      style={{
        backgroundColor: scrolled
          ? "color-mix(in srgb, var(--bg) 86%, transparent)"
          : "transparent",
      }}
    >
      <div
        ref={progressRef}
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-violet via-cyan to-violet"
      />
      <nav aria-label="Primary" className="shell flex h-[4.5rem] items-center justify-between gap-4">
        <a
          href="#home"
          className="group flex items-baseline gap-2 text-[1.05rem] font-semibold tracking-[-0.03em] text-ink"
          onClick={() => setMenuOpen(false)}
        >
          <span>{profile.wordmark}</span>
          <span className="hidden text-[0.65rem] font-medium uppercase tracking-[0.2em] text-faint transition-colors group-hover:text-muted sm:inline">
            AI &amp; Full-Stack
          </span>
          <span className="sr-only">— {profile.name}, back to top</span>
        </a>

        <div className="hidden items-center rounded-full border border-line bg-panel p-1 lg:flex">
          {links.map((link) => {
            const isActive = active === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-full px-3 py-1.5 text-[0.8rem] font-medium transition-colors duration-200 ${
                  isActive ? "bg-violet-soft text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <a href="#contact" className="btn btn-primary hidden sm:inline-flex">
            Let&apos;s Connect
            <ArrowUpRight aria-hidden="true" size={15} />
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="icon-link lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <X aria-hidden="true" size={18} strokeWidth={1.75} />
            ) : (
              <Menu aria-hidden="true" size={18} strokeWidth={1.75} />
            )}
          </button>
        </div>
      </nav>

      <div id="mobile-menu" hidden={!menuOpen} className="lg:hidden">
        <div className="shell pb-5">
          <div className="overflow-hidden rounded-2xl border border-line bg-bg-soft p-2 shadow-[0_28px_70px_-24px_rgba(0,0,0,0.7)]">
            <ul className="flex flex-col">
              {links.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => setMenuOpen(false)}
                    aria-current={active === link.id ? "page" : undefined}
                    className={`flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                      active === link.id
                        ? "bg-violet-soft text-ink"
                        : "text-muted hover:bg-panel hover:text-ink"
                    }`}
                  >
                    {link.label}
                    <ArrowUpRight aria-hidden="true" size={14} className="opacity-50" />
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="btn btn-primary mt-2 w-full"
            >
              Let&apos;s Connect
              <ArrowUpRight aria-hidden="true" size={15} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

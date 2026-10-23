import { useEffect, useState } from "react";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Credentials } from "./components/Credentials";
import { Exploring } from "./components/Exploring";
import { Footer } from "./components/Footer";
import { GitHubSection } from "./components/GitHubSection";
import { Hero } from "./components/Hero";
import { IntroScreen } from "./components/IntroScreen";
import { Navbar } from "./components/Navbar";
import { NotFound } from "./components/NotFound";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { useBodyScrollLock, useRevealOnScroll, useTheme } from "./lib/hooks";

const knownPaths = new Set(["/", "/index.html"]);
const INTRO_KEY = "mn-intro-seen";

const isKnownPath = knownPaths.has(window.location.pathname.replace(/\/$/, "") || "/");

/** Decide once per page load so React re-renders cannot re-trigger the intro. */
let introDecision: boolean | undefined;
function shouldPlayIntro() {
  if (introDecision !== undefined) return introDecision;
  introDecision = false;
  try {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduceMotion && !window.sessionStorage.getItem(INTRO_KEY)) {
      window.sessionStorage.setItem(INTRO_KEY, "1");
      introDecision = true;
    }
  } catch {
    introDecision = false;
  }
  return introDecision;
}

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [introPlaying, setIntroPlaying] = useState(() => isKnownPath && shouldPlayIntro());

  useRevealOnScroll();
  useBodyScrollLock(introPlaying);

  useEffect(() => {
    document.documentElement.dataset.intro = introPlaying ? "playing" : "done";
  }, [introPlaying]);

  useEffect(() => {
    if (!introPlaying) return;
    // Always open the film from the top, even after a reload mid-page.
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, [introPlaying]);

  if (!isKnownPath) {
    return (
      <>
        <a
          href="#main"
          className="sr-only fixed left-4 top-4 z-[100] rounded-lg bg-ink px-4 py-2 text-sm font-medium text-bg focus:not-sr-only"
        >
          Skip to content
        </a>
        <div id="main">
          <NotFound />
        </div>
      </>
    );
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only fixed left-4 top-4 z-[100] rounded-lg bg-ink px-4 py-2 text-sm font-medium text-bg focus:not-sr-only"
      >
        Skip to content
      </a>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main id="main">
        <Hero theme={theme} />
        <About />
        <Skills />
        <Projects />
        <Exploring />
        <Credentials />
        <GitHubSection />
        <Contact />
      </main>
      <Footer />
      {introPlaying && <IntroScreen onDone={() => setIntroPlaying(false)} />}
    </>
  );
}

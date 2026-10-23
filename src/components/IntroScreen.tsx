import { useCallback, useEffect, useRef, useState } from "react";

const BOOT_LINES = [
  "neural core .......... mounted",
  "optical array ........ calibrated",
  "sensor mesh .......... synced",
  "runtime .............. online",
];

const LEAVE_MS = 760;
const BOOT_MS = 2350;

type Props = {
  onDone: () => void;
};

/**
 * Short cinematic boot sequence that covers the hero on first load, then
 * dissolves to reveal the android. Skippable, and never shown twice per tab.
 */
export function IntroScreen({ onDone }: Props) {
  const [leaving, setLeaving] = useState(false);
  const finished = useRef(false);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  const leave = useCallback(() => setLeaving(true), []);

  const complete = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    doneRef.current();
  }, []);

  useEffect(() => {
    const bootTimer = window.setTimeout(leave, BOOT_MS);
    const doneTimer = window.setTimeout(complete, BOOT_MS + LEAVE_MS);
    return () => {
      window.clearTimeout(bootTimer);
      window.clearTimeout(doneTimer);
    };
  }, [leave, complete]);

  const skip = useCallback(() => {
    leave();
    window.setTimeout(complete, 700);
  }, [leave, complete]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Enter" || event.key === " ") skip();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [skip]);

  return (
    <div
      className={`intro ${leaving ? "is-leaving" : ""}`}
      role="presentation"
      data-testid="intro"
    >
      <div aria-hidden="true" className="intro-grid" />
      <div aria-hidden="true" className="intro-scan" />
      <div aria-hidden="true" className="intro-vignette" />

      <div aria-hidden="true" className="intro-corners">
        <span className="intro-corner intro-corner--tl" />
        <span className="intro-corner intro-corner--tr" />
        <span className="intro-corner intro-corner--bl" />
        <span className="intro-corner intro-corner--br" />
      </div>

      <div className="intro-hud intro-hud--top">
        <span>MN / SYSTEM BOOT</span>
        <span>v1.0</span>
      </div>

      <div className="intro-center">
        <div className="intro-mark" aria-hidden="true">
          MN
        </div>
        <p className="intro-name">MOHAMMED NISARUDDIN</p>
        <div className="intro-progress" aria-hidden="true">
          <span className="intro-progress-fill" />
        </div>
        <ul className="intro-log">
          {BOOT_LINES.map((line, index) => (
            <li key={line} style={{ animationDelay: `${320 + index * 420}ms` }}>
              {line}
            </li>
          ))}
        </ul>
      </div>

      <button type="button" className="intro-skip" onClick={skip}>
        Skip intro
        <span aria-hidden="true">→</span>
      </button>

      <p className="sr-only">
        Loading the portfolio of Mohammed Nisaruddin. Use the skip intro button to go straight to the
        content.
      </p>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import type { Theme } from "../lib/hooks";
import type { AndroidHandle } from "../three/androidHead";
import { RobotVisual } from "./RobotVisual";

type Props = {
  theme: Theme;
  className?: string;
};

/**
 * Live 3D android. The WebGL scene module is loaded lazily so three.js never
 * blocks first paint, and the canvas fades in once the first frame is ready.
 */
export function AndroidStage({ theme, className }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<AndroidHandle | null>(null);
  const themeRef = useRef(theme);
  const [status, setStatus] = useState<"loading" | "ready" | "failed">("loading");

  themeRef.current = theme;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let cancelled = false;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    import("../three/androidHead")
      .then(({ createAndroidScene }) => {
        if (cancelled) return;
        const handle = createAndroidScene(host, themeRef.current, reduceMotion);
        if (!handle) {
          setStatus("failed");
          return;
        }
        handleRef.current = handle;
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("failed");
      });

    return () => {
      cancelled = true;
      handleRef.current?.dispose();
      handleRef.current = null;
    };
  }, []);

  useEffect(() => {
    handleRef.current?.setTheme(theme);
  }, [theme]);

  // Without WebGL the illustrated robot keeps the hero complete.
  if (status === "failed") return <RobotVisual />;

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      data-state={status}
      className={`android-stage ${status === "ready" ? "is-ready" : ""} ${className ?? ""}`}
    />
  );
}

import { Moon, Sun } from "lucide-react";
import type { Theme } from "../lib/hooks";

type ThemeToggleProps = {
  theme: Theme;
  onToggle: () => void;
  className?: string;
};

export function ThemeToggle({ theme, onToggle, className = "" }: ThemeToggleProps) {
  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme`}
      className={`icon-link relative ${className}`.trim()}
    >
      {theme === "dark" ? (
        <Sun aria-hidden="true" size={16} strokeWidth={1.75} />
      ) : (
        <Moon aria-hidden="true" size={16} strokeWidth={1.75} />
      )}
    </button>
  );
}

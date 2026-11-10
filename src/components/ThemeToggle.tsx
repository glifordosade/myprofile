import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ThemeToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  class?: string;
}

export function ThemeToggle({ className, class: classProp, ...props }: ThemeToggleProps) {
  // Default must be dark according to PRD.md & DESIGN.md
  const [theme, setTheme] = React.useState<"dark" | "light">("dark");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");
    const isLight = stored === "light";

    if (isLight) {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    } else {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "theme") {
        const newTheme = e.newValue === "light" ? "light" : "dark";
        setTheme(newTheme);
      }
    };

    const handleCustomChange = (e: Event) => {
      const customEvent = e as CustomEvent<"dark" | "light">;
      if (customEvent.detail) {
        setTheme(customEvent.detail);
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("theme-change", handleCustomChange as EventListener);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("theme-change", handleCustomChange as EventListener);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);

    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("theme-change", { detail: nextTheme })
      );
    }
  };

  const isDark = !mounted || theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={cn(
        "relative inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] border border-border/60 bg-secondary/50 text-foreground transition-all duration-200 cursor-pointer",
        "hover:border-primary/40 hover:bg-secondary hover:text-primary",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "active:scale-95",
        className,
        classProp
      )}
      {...props}
    >
      {isDark ? (
        <Moon
          strokeWidth={1.5}
          className="h-4 w-4 text-primary transition-transform duration-200"
        />
      ) : (
        <Sun
          strokeWidth={1.5}
          className="h-4 w-4 text-amber-500 transition-transform duration-200"
        />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}

export default ThemeToggle;

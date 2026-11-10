import * as React from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

export interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Featured Projects", href: "/projects" },
  { label: "Professional Experience", href: "/experience" },
];

export interface NavbarProps {
  className?: string;
  class?: string;
  currentPath?: string;
}

export function Navbar({ className, class: classProp, currentPath: initialPath }: NavbarProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [currentPath, setCurrentPath] = React.useState(initialPath || "/");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);

      const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);
      };

      handleScroll();
      window.addEventListener("scroll", handleScroll, { passive: true });

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsMobileMenuOpen(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, []);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    setIsMobileMenuOpen(false);

    if (href === "/") {
      const isCurrentlyHome =
        typeof window !== "undefined" &&
        (window.location.pathname === "/" || window.location.pathname === "");

      if (isCurrentlyHome) {
        e.preventDefault();
        const topEl = document.getElementById("top");
        if (topEl) {
          topEl.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }

        if (window.location.hash) {
          history.pushState(
            "",
            document.title,
            window.location.pathname + window.location.search
          );
        }
      }
    }
  };

  const isActive = (href: string) => {
    if (href === "/") {
      return currentPath === "/" || currentPath === "";
    }
    return currentPath.startsWith(href);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] w-full font-mono transition-all duration-300",
        isScrolled
          ? "bg-neutral-950/95 dark:bg-black/95 backdrop-blur-md border-b border-white/10 shadow-md shadow-black/20 py-3"
          : "bg-transparent border-b border-transparent py-4 sm:py-5",
        className,
        classProp
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo: "Zhafa" */}
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, "/")}
            className={cn(
              "group inline-flex items-center gap-1.5 text-lg font-bold tracking-tight transition-colors duration-200 select-none",
              isScrolled
                ? "text-white hover:text-primary"
                : "text-foreground hover:text-primary"
            )}
            aria-label="Zhafa Portfolio Home"
          >
            <span className="text-primary font-mono font-black">&gt;</span>
            <span
              className={cn(
                "transition-colors duration-200",
                isScrolled ? "text-white font-bold" : "font-bold text-foreground"
              )}
            >
              ZHAFA
            </span>
            <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className={cn(
                    "px-3.5 py-1.5 rounded-[var(--radius-md)] text-sm transition-all duration-200 select-none",
                    isScrolled
                      ? "text-white font-bold hover:text-white hover:bg-white/15"
                      : "text-foreground/80 font-medium hover:text-foreground hover:bg-secondary/60",
                    active && (
                      isScrolled
                        ? "text-white bg-white/20 font-extrabold shadow-xs border border-white/20"
                        : "text-primary bg-primary/10 font-semibold border border-primary/25"
                    )
                  )}
                >
                  {item.label}
                </a>
              );
            })}

            {/* Desktop Theme Toggle */}
            <div
              className={cn(
                "ml-2 pl-2 border-l transition-colors duration-200",
                isScrolled ? "border-white/20" : "border-border/40"
              )}
            >
              <ThemeToggle
                className={cn(
                  isScrolled
                    ? "border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-primary hover:border-primary/40"
                    : ""
                )}
              />
            </div>
          </nav>

          {/* Mobile Right Actions */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle
              className={cn(
                isScrolled
                  ? "border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-primary hover:border-primary/40"
                  : ""
              )}
            />
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              className={cn(
                "inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] border transition-all duration-200 cursor-pointer",
                isScrolled
                  ? "border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-primary hover:border-primary/40"
                  : "border-border/60 bg-secondary/50 text-foreground hover:bg-secondary hover:text-primary hover:border-primary/40",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                "active:scale-95"
              )}
            >
              {isMobileMenuOpen ? (
                <X strokeWidth={1.5} className="h-5 w-5" />
              ) : (
                <Menu strokeWidth={1.5} className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-200 ease-in-out border-b",
          isScrolled
            ? "border-white/10 bg-neutral-950/95 dark:bg-black/95 backdrop-blur-md"
            : "border-border/30 bg-background/95 dark:bg-black/95 backdrop-blur-md",
          isMobileMenuOpen
            ? "max-h-80 opacity-100 shadow-xl"
            : "max-h-0 opacity-0 pointer-events-none"
        )}
      >
        <div className="px-4 pt-3 pb-5 space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className={cn(
                  "block px-3.5 py-2.5 rounded-[var(--radius-md)] text-sm transition-all duration-200",
                  isScrolled
                    ? "text-white font-bold hover:bg-white/10 hover:text-white"
                    : "text-foreground/90 font-medium hover:bg-secondary/70 hover:text-foreground",
                  active && (
                    isScrolled
                      ? "bg-white/20 text-white font-extrabold border border-white/20"
                      : "bg-primary/15 text-primary font-semibold border border-primary/25"
                  )
                )}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </div>
    </header>
  );
}

export default Navbar;

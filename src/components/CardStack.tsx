"use client";
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { TechSkillsSection } from "@/components/sections/TechSkillsSection";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { ContactSection } from "@/components/sections/ContactSection";

interface SectionDef {
  id: string;
  label: string;
  Component: React.ComponentType<{ className?: string }>;
  zIndex: number;
}

const SECTIONS: SectionDef[] = [
  { id: "hero",         label: "Intro",         Component: HeroSection,         zIndex: 1  },
  { id: "about",        label: "About",          Component: AboutSection,        zIndex: 2  },
  { id: "projects",     label: "Projects",       Component: ProjectsSection,     zIndex: 3  },
  { id: "experience",   label: "Experience",     Component: ExperienceSection,   zIndex: 4  },
  { id: "skills",       label: "Skills",         Component: TechSkillsSection,   zIndex: 5  },
  { id: "achievements", label: "Achievements",   Component: AchievementsSection, zIndex: 6  },
  { id: "contact",      label: "Contact",        Component: ContactSection,      zIndex: 7  },
];

// Corner offset per card so stacked cards show below the active one
const TOP_OFFSET_PX = 0; // each card is sticky top-0; the stacking illusion comes from z-index

export interface CardStackProps {
  className?: string;
}

export function CardStack({ className }: CardStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let gsapLoaded = false;
    let ScrollTriggerLoaded = false;
    let cleanupFns: (() => void)[] = [];

    const setupAnimations = async () => {
      try {
        const gsapModule = await import("gsap");
        const scrollTriggerModule = await import("gsap/ScrollTrigger");
        const gsap = gsapModule.default;
        const { ScrollTrigger } = scrollTriggerModule;

        gsap.registerPlugin(ScrollTrigger);
        gsapLoaded = true;
        ScrollTriggerLoaded = true;

        sectionRefs.current.forEach((el, index) => {
          if (!el) return;

          // Animate each section's inner content children with fade-in from below
          const contentChildren = el.querySelectorAll<HTMLElement>(
            "[data-animate]"
          );

          if (contentChildren.length > 0) {
            gsap.set(contentChildren, { opacity: 0, y: 40 });

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: el,
                start: "top 78%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
              },
            });

            tl.to(contentChildren, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.12,
              ease: "power3.out",
            });

            cleanupFns.push(() => tl.kill());
          }

          // Scale + border radius reveal for the card panel itself
          if (index > 0) {
            gsap.fromTo(
              el,
              { borderTopLeftRadius: "0px", borderTopRightRadius: "0px" },
              {
                borderTopLeftRadius: "20px",
                borderTopRightRadius: "20px",
                duration: 0.5,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: el,
                  start: "top 90%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }
        });

        ScrollTrigger.refresh();
        cleanupFns.push(() => ScrollTrigger.getAll().forEach((t) => t.kill()));
      } catch (err) {
        // GSAP not available — gracefully fall back (components are still visible without animation)
        console.warn("[CardStack] GSAP animation setup failed:", err);
      }
    };

    // Small delay to let DOM settle
    const timer = setTimeout(() => {
      setupAnimations();
    }, 100);

    return () => {
      clearTimeout(timer);
      cleanupFns.forEach((fn) => fn());
    };
  }, []);

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      {SECTIONS.map((section, index) => {
        const { id, Component, zIndex, label } = section;
        const isFirstCard = index === 0;

        return (
          <div
            key={id}
            id={id}
            ref={(el) => {
              sectionRefs.current[index] = el;
            }}
            aria-label={label}
            style={{ zIndex }}
            className={cn(
              "relative w-full",
              // Sticky so each card pins to the top as you scroll into the next
              "sticky top-0",
              // Visual card stacking: not the first card gets rounded top corners and a border-top + shadow
              !isFirstCard && [
                "rounded-t-[20px]",
                "border-t border-border/50",
                "shadow-[0_-8px_40px_rgba(0,0,0,0.30)]",
              ]
            )}
          >
            <Component className="w-full" />
          </div>
        );
      })}
    </div>
  );
}

export default CardStack;

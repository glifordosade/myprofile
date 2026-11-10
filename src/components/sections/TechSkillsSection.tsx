import React from "react";
import {
  Code2,
  FileCode,
  Terminal,
  Cpu,
  Binary,
  Database,
  Layers,
  Rocket,
  Globe,
  Palette,
  Sparkles,
  Box,
  Server,
  Zap,
  Container,
  Network,
  Cloud,
  Brain,
  Activity,
  Bot,
  BarChart,
  Cpu as CpuAlt,
  Wrench,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { GridScan } from "@/components/backgrounds/GridScan";
import { SKILL_CATEGORIES } from "@/data/portfolioData";
import { cn } from "@/lib/utils";

// Map icon name strings to actual Lucide components
const ICON_MAP: Record<string, React.ComponentType<{ strokeWidth?: number; className?: string }>> = {
  Code2,
  FileCode,
  Terminal,
  Cpu,
  Binary,
  Database,
  Layers,
  Rocket,
  Globe,
  Palette,
  Sparkles,
  Box,
  Server,
  Zap,
  Container,
  Network,
  Cloud,
  Brain,
  Activity,
  Bot,
  BarChart,
  CpuAlt,
};

const LEVEL_CONFIG: Record<string, { label: string; bars: number; color: string }> = {
  Expert: { label: "Expert", bars: 5, color: "bg-primary" },
  Advanced: { label: "Advanced", bars: 4, color: "bg-primary/70" },
  Intermediate: { label: "Intermediate", bars: 3, color: "bg-primary/50" },
  Beginner: { label: "Beginner", bars: 2, color: "bg-primary/30" },
};

function LevelBars({ level }: { level: string }) {
  const config = LEVEL_CONFIG[level] || LEVEL_CONFIG.Intermediate;
  return (
    <div className="flex items-center gap-0.5" title={`${level} (${config.bars}/5)`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "h-1.5 w-4 rounded-full transition-all duration-200",
            i < config.bars ? config.color : "bg-border/50"
          )}
        />
      ))}
    </div>
  );
}

export interface TechSkillsSectionProps {
  className?: string;
}

export function TechSkillsSection({ className }: TechSkillsSectionProps) {
  return (
    <section
      id="skills"
      className={cn(
        "relative w-full min-h-screen overflow-hidden bg-background text-foreground py-24 sm:py-32",
        className
      )}
    >
      <GridScan className="absolute inset-0 w-full h-full pointer-events-none" />
      <div className="absolute inset-0 bg-linear-to-br from-background/80 via-transparent to-background/80 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div data-animate className="space-y-3 mb-16 max-w-2xl">
          <Badge variant="outline">
            <Wrench strokeWidth={1.5} className="h-3 w-3 text-primary" />
            Tech & Skills
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-extrabold font-mono tracking-tight">
            My{" "}
            <span className="text-primary">Toolkit</span>
          </h2>
          <p className="text-muted-foreground text-base font-mono leading-relaxed">
            Technologies and frameworks I use daily to build fast, reliable, and beautiful software.
          </p>
        </div>

        {/* Categories Grid */}
        <div data-animate className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {SKILL_CATEGORIES.map((category) => (
            <div
              key={category.title}
              className="group flex flex-col rounded-xl border border-border/60 bg-card/70 hover:bg-card hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 overflow-hidden backdrop-blur-xs"
            >
              {/* Category Header */}
              <div className="p-4 border-b border-border/40 bg-card/50 group-hover:bg-primary/5 transition-colors duration-200">
                <h3 className="text-sm font-bold font-mono text-foreground">{category.title}</h3>
                <p className="text-[11px] font-mono text-muted-foreground mt-0.5 leading-tight">{category.description}</p>
              </div>

              {/* Skills List */}
              <div className="flex-1 p-3 space-y-2">
                {category.skills.map((skill) => {
                  const Icon = skill.iconName ? (ICON_MAP[skill.iconName] || Code2) : Code2;
                  return (
                    <div
                      key={skill.name}
                      className="flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-secondary/50 transition-colors duration-200 group/skill"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 border border-primary/15 group-hover/skill:bg-primary/20 transition-colors duration-200 shrink-0">
                          <Icon strokeWidth={1.5} className="h-3 w-3 text-primary" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-mono font-medium text-foreground truncate">{skill.name}</p>
                          <LevelBars level={skill.level} />
                        </div>
                      </div>
                      <Badge variant="muted" className="text-[9px] py-0.5 shrink-0">
                        {skill.level}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Proficiency Legend */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-muted-foreground">
          <span className="uppercase tracking-wider">Proficiency Scale:</span>
          {Object.entries(LEVEL_CONFIG).map(([level, { bars, color }]) => (
            <div key={level} className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={cn("h-1.5 w-3 rounded-full", i < bars ? color : "bg-border/50")} />
                ))}
              </div>
              <span>{level}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TechSkillsSection;

import React from "react";
import {
  Heart,
  Layers,
  Code2,
  Lightbulb,
  Target,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { PatternWaves } from "@/components/backgrounds/PatternWaves";
import { PROFILE_DATA } from "@/data/portfolioData";
import { cn } from "@/lib/utils";

export interface AboutSectionProps {
  className?: string;
}

const PHILOSOPHY_POINTS = [
  {
    icon: Layers,
    title: "Systems Thinking",
    text: "Every component exists within a larger system. I design with the whole architecture in mind — ensuring scalability before optimization.",
  },
  {
    icon: Code2,
    title: "Clean Code as Craft",
    text: "Readable, self-documenting code is a form of respect for your future team. I obsess over naming, boundaries, and clear separation of concerns.",
  },
  {
    icon: Lightbulb,
    title: "First Principles Engineering",
    text: "I challenge assumptions and derive solutions from fundamentals rather than copying patterns I don't fully understand.",
  },
  {
    icon: Target,
    title: "Ship, Then Refine",
    text: "Momentum beats perfection. I aim to deliver working software quickly and iterate thoughtfully based on real feedback.",
  },
];

export function AboutSection({ className }: AboutSectionProps) {
  return (
    <section
      id="about"
      className={cn(
        "relative w-full min-h-screen overflow-hidden bg-background text-foreground py-24 sm:py-32",
        className
      )}
    >
      <PatternWaves className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-radial-[at_30%_20%] from-primary/5 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div data-animate className="space-y-3 mb-16 max-w-2xl">
          <Badge variant="outline">
            <Heart strokeWidth={1.5} className="h-3 w-3 text-primary" />
            About Me
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-extrabold font-mono tracking-tight">
            The Mind Behind
            <br />
            <span className="text-primary">the Code</span>
          </h2>
          <p className="text-muted-foreground text-base font-mono leading-relaxed">
            A builder, a learner, and an engineer who cares deeply about the quality of what gets shipped.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Narrative */}
          <div data-animate className="lg:col-span-5 space-y-6">
            <div className="space-y-4 font-mono text-base leading-8 text-foreground/85">
              <p>
                {PROFILE_DATA.bio}
              </p>
              <p>
                My passion lies in the intersection of <span className="text-primary font-semibold">Data Science &amp; Artificial Intelligence</span> and real-world software engineering — from researching deep learning speech synthesis models to architecting resilient web applications with Laravel, Next.js, and relational databases.
              </p>
              <p>
                Experienced in translating complex administrative workflows and data-driven requirements into reliable software solutions, with a strong commitment to clean code, database integrity, and high-quality user experiences.
              </p>
              <p className="text-muted-foreground text-sm border-l-2 border-primary/50 pl-4 italic">
                "Development Of An Indonesian Emotional Voice Cloning Model Based On The YourTTS Architecture." — Undergraduate Thesis (Cumlaude, GPA 3.78)
              </p>
            </div>

            {/* Tech interest badges */}
            <div className="flex flex-wrap gap-2 pt-4">
              {["Deep Learning", "Voice Cloning", "Data Science", "Laravel", "Python", "FastAPI", "Next.js", "PostgreSQL"].map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </div>

          {/* Right: Stats + Philosophy Grid */}
          <div data-animate className="lg:col-span-7 space-y-10">

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {PROFILE_DATA.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="group relative p-4 rounded-xl border border-border/60 bg-card/60 hover:bg-card hover:border-primary/30 hover:shadow-md hover:shadow-primary/10 transition-all duration-200 text-center backdrop-blur-xs"
                >
                  <p className="text-3xl font-extrabold font-mono text-primary group-hover:scale-110 transition-transform duration-200">{stat.value}</p>
                  <p className="text-[11px] text-muted-foreground font-mono mt-1 leading-tight">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Engineering Philosophy Grid */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                <Users strokeWidth={1.5} className="h-3.5 w-3.5 text-primary" />
                Engineering Philosophy
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PHILOSOPHY_POINTS.map((point) => {
                  const Icon = point.icon;
                  return (
                    <div
                      key={point.title}
                      className="group p-4 rounded-xl border border-border/50 bg-card/50 hover:bg-card hover:border-primary/25 hover:shadow-md hover:shadow-primary/10 transition-all duration-200"
                    >
                      <div className="flex items-center gap-2.5 mb-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/15 border border-primary/20 group-hover:bg-primary/25 transition-colors duration-200">
                          <Icon strokeWidth={1.5} className="h-3.5 w-3.5 text-primary" />
                        </span>
                        <h3 className="text-sm font-semibold font-mono text-foreground">{point.title}</h3>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed font-mono">{point.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;

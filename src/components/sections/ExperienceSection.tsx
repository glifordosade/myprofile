import React from "react";
import {
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle2,
  Users,
  Calendar,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Particles } from "@/components/backgrounds/Particles";
import { EXPERIENCES } from "@/data/portfolioData";
import { cn } from "@/lib/utils";

export interface ExperienceSectionProps {
  className?: string;
}

export function ExperienceSection({ className }: ExperienceSectionProps) {
  const featured = EXPERIENCES.filter((e) => e.featured).slice(0, 3);

  return (
    <section
      id="experience"
      className={cn(
        "relative w-full min-h-screen overflow-hidden bg-background text-foreground py-24 sm:py-32",
        className
      )}
    >
      <Particles className="absolute inset-0 w-full h-full pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/50 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div data-animate className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
          <div className="space-y-3 max-w-xl">
            <Badge variant="outline">
              <Briefcase strokeWidth={1.5} className="h-3 w-3 text-primary" />
              Professional Experience
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-extrabold font-mono tracking-tight">
              Where I've{" "}
              <span className="text-primary">Worked</span>
            </h2>
            <p className="text-muted-foreground text-base font-mono leading-relaxed">
              Roles and organizations that shaped how I think about software, teams, and impact.
            </p>
          </div>
          <Button variant="outline" href="/experience" className="group shrink-0">
            View All Experiences
            <ArrowRight
              strokeWidth={1.5}
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            />
          </Button>
        </div>

        {/* Experience Cards */}
        <div data-animate className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {featured.map((exp) => (
            <Card
              key={exp.id}
              className={cn(
                "group flex flex-col overflow-hidden border-border/60 bg-card/70 backdrop-blur-xs transition-all duration-300",
                "hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
              )}
            >
              <CardHeader className="pb-3">
                {/* Company + Type Row */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors duration-200 shrink-0">
                      {exp.type === "Work" ? (
                        <Building2 strokeWidth={1.5} className="h-4 w-4 text-primary" />
                      ) : (
                        <Users strokeWidth={1.5} className="h-4 w-4 text-primary" />
                      )}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-mono text-muted-foreground truncate">{exp.company}</p>
                    </div>
                  </div>
                  <Badge
                    variant={exp.type === "Work" ? "primary" : "secondary"}
                    className="text-[10px] shrink-0"
                  >
                    {exp.type}
                  </Badge>
                </div>

                <CardTitle className="text-base leading-tight group-hover:text-primary transition-colors duration-200">
                  {exp.role}
                </CardTitle>

                {/* Period + Location */}
                <div className="flex flex-col gap-1 mt-1">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground">
                    <Calendar strokeWidth={1.5} className="h-3 w-3 shrink-0" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground">
                    <MapPin strokeWidth={1.5} className="h-3 w-3 shrink-0" />
                    <span className="truncate">{exp.location}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 space-y-4">
                <CardDescription className="text-sm leading-relaxed line-clamp-3">
                  {exp.synopsis}
                </CardDescription>

                {/* Achievements */}
                <div className="space-y-2">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground/70">Key Achievements</p>
                  <ul className="space-y-1.5">
                    {exp.achievements.slice(0, 2).map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2
                          strokeWidth={1.5}
                          className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5"
                        />
                        <span className="text-xs font-mono text-muted-foreground leading-relaxed">{achievement}</span>
                      </li>
                    ))}
                    {exp.achievements.length > 2 && (
                      <li className="text-[11px] font-mono text-muted-foreground/60 pl-5.5">
                        +{exp.achievements.length - 2} more achievements...
                      </li>
                    )}
                  </ul>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5">
                  {exp.skills.slice(0, 4).map((skill) => (
                    <Badge key={skill} variant="muted" className="text-[10px] py-0.5">
                      {skill}
                    </Badge>
                  ))}
                  {exp.skills.length > 4 && (
                    <Badge variant="muted" className="text-[10px] py-0.5">
                      +{exp.skills.length - 4}
                    </Badge>
                  )}
                </div>
              </CardContent>

              <CardFooter className="pt-3 border-t border-border/40">
                <Button
                  variant="ghost"
                  size="sm"
                  href={`/experience/${exp.id}`}
                  className="group/btn ml-auto text-muted-foreground hover:text-primary"
                >
                  View Case Study
                  <ArrowRight
                    strokeWidth={1.5}
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-1"
                  />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Button variant="primary" size="lg" href="/experience" className="group shadow-lg shadow-primary/20">
            Full Work History
            <ArrowRight
              strokeWidth={1.5}
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            />
          </Button>
        </div>
      </div>
    </section>
  );
}

export default ExperienceSection;

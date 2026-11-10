import React from "react";
import {
  Award,
  BadgeCheck,
  Star,
  Trophy,
  ExternalLink,
  Calendar,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { LightRays } from "@/components/backgrounds/LightRays";
import { ACHIEVEMENTS } from "@/data/portfolioData";
import { cn } from "@/lib/utils";

export interface AchievementsSectionProps {
  className?: string;
}

const CATEGORY_CONFIG: Record<
  string,
  { icon: React.ComponentType<{ strokeWidth?: number; className?: string }>; variant: "primary" | "secondary" | "muted" | "outline" }
> = {
  Certification: { icon: BadgeCheck, variant: "primary" },
  Leadership: { icon: Star, variant: "secondary" },
  Award: { icon: Trophy, variant: "outline" },
};

export function AchievementsSection({ className }: AchievementsSectionProps) {
  return (
    <section
      id="achievements"
      className={cn(
        "relative w-full min-h-screen overflow-hidden bg-background text-foreground py-24 sm:py-32",
        className
      )}
    >
      <LightRays className="absolute inset-0 w-full h-full pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 to-background/60 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div data-animate className="space-y-3 mb-16 max-w-2xl">
          <Badge variant="outline">
            <Award strokeWidth={1.5} className="h-3 w-3 text-primary" />
            Achievements & Leadership
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-extrabold font-mono tracking-tight">
            Milestones &{" "}
            <span className="text-primary">Recognition</span>
          </h2>
          <p className="text-muted-foreground text-base font-mono leading-relaxed">
            Certifications, awards, and leadership roles that mark the journey so far.
          </p>
        </div>

        {/* Achievements Grid */}
        <div data-animate className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {ACHIEVEMENTS.map((achievement) => {
            const config = CATEGORY_CONFIG[achievement.category] || CATEGORY_CONFIG.Certification;
            const Icon = config.icon;

            return (
              <Card
                key={achievement.id}
                className={cn(
                  "group flex flex-col border-border/60 bg-card/70 backdrop-blur-xs transition-all duration-300",
                  "hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
                )}
              >
                <CardHeader className="pb-2">
                  {/* Icon + Category */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200",
                      "bg-primary/10 border-primary/20 group-hover:bg-primary/20 group-hover:scale-110"
                    )}>
                      <Icon strokeWidth={1.5} className="h-5 w-5 text-primary" />
                    </span>
                    <Badge variant={config.variant} className="text-[10px]">
                      {achievement.category}
                    </Badge>
                  </div>

                  <CardTitle className="text-sm leading-tight group-hover:text-primary transition-colors duration-200">
                    {achievement.title}
                  </CardTitle>

                  {/* Issuer + Date */}
                  <div className="flex items-center justify-between mt-1.5 text-[11px] font-mono text-muted-foreground">
                    <span className="font-medium text-foreground/70 truncate mr-2">{achievement.issuer}</span>
                    <div className="flex items-center gap-1 shrink-0">
                      <Calendar strokeWidth={1.5} className="h-3 w-3" />
                      <span>{achievement.date}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex-1">
                  <CardDescription className="text-xs leading-relaxed line-clamp-3">
                    {achievement.description}
                  </CardDescription>
                </CardContent>

                {achievement.credentialUrl && (
                  <CardFooter className="pt-2 border-t border-border/40">
                    <Button
                      variant="ghost"
                      size="sm"
                      href={achievement.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group/btn ml-auto text-muted-foreground hover:text-primary text-xs"
                    >
                      View Credential
                      <ExternalLink
                        strokeWidth={1.5}
                        className="h-3 w-3 transition-transform duration-200 group-hover/btn:scale-110"
                      />
                    </Button>
                  </CardFooter>
                )}
              </Card>
            );
          })}
        </div>

        {/* Summary Stats */}
        <div className="mt-14 grid grid-cols-3 gap-4 max-w-sm mx-auto sm:max-w-none sm:grid-cols-3 sm:w-fit sm:mx-auto">
          {[
            { icon: BadgeCheck, label: "Certifications", value: ACHIEVEMENTS.filter(a => a.category === "Certification").length },
            { icon: Trophy, label: "Awards Won", value: ACHIEVEMENTS.filter(a => a.category === "Award").length },
            { icon: Star, label: "Leadership Roles", value: ACHIEVEMENTS.filter(a => a.category === "Leadership").length },
          ].map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1.5 p-4 rounded-xl border border-border/50 bg-card/50 hover:border-primary/30 hover:bg-card transition-all duration-200 min-w-[100px]"
            >
              <Icon strokeWidth={1.5} className="h-5 w-5 text-primary" />
              <span className="text-2xl font-extrabold font-mono text-primary">{value}</span>
              <span className="text-[11px] font-mono text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AchievementsSection;

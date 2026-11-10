import * as React from "react";
import { EXPERIENCES, type Experience } from "@/data/portfolioData";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  Button,
} from "@/components/ui";
import { Briefcase, Users, Calendar, MapPin, ArrowRight, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const TYPE_FILTERS = ["All", "Work", "Organization"] as const;
type TypeFilter = typeof TYPE_FILTERS[number];

export function ExperienceClient() {
  const [activeType, setActiveType] = React.useState<TypeFilter>("All");

  const filtered = EXPERIENCES.filter((exp) => {
    return activeType === "All" || exp.type === activeType;
  });

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-12">
          <Badge variant="secondary" className="text-xs mb-3">career</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold font-mono text-foreground mb-4">
            Professional Experience
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
            Work history, community leadership, and impactful technical milestones.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {TYPE_FILTERS.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setActiveType(type)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-mono font-medium border transition-all duration-200 cursor-pointer inline-flex items-center gap-1.5",
                activeType === type
                  ? "bg-primary/15 border-primary/40 text-primary"
                  : "bg-secondary/50 border-border/60 text-muted-foreground hover:border-primary/30 hover:text-foreground"
              )}
            >
              {type === "Work" && <Briefcase strokeWidth={1.5} className="h-3 w-3" />}
              {type === "Organization" && <Users strokeWidth={1.5} className="h-3 w-3" />}
              {type}
            </button>
          ))}
        </div>

        {/* Experience list */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground font-mono">
            <p className="text-lg">// No experiences found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((exp) => (
              <ExperienceCard key={exp.id} experience={exp} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ExperienceCard({ experience: exp }: { experience: Experience }) {
  return (
    <Card className="group hover:border-primary/40 hover:shadow-md hover:shadow-primary/10 transition-all duration-200 flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <Badge
            variant={exp.type === "Work" ? "primary" : "secondary"}
            className="text-xs"
          >
            {exp.type === "Work" ? (
              <Briefcase strokeWidth={1.5} className="h-3 w-3" />
            ) : (
              <Users strokeWidth={1.5} className="h-3 w-3" />
            )}
            {exp.type}
          </Badge>
          {exp.featured && (
            <Badge variant="muted" className="text-xs">Featured</Badge>
          )}
        </div>
        <CardTitle className="text-lg leading-snug">{exp.role}</CardTitle>
        <p className="text-sm font-semibold text-primary mt-0.5">{exp.company}</p>
        <div className="flex flex-col gap-0.5 mt-1">
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar strokeWidth={1.5} className="h-3 w-3 flex-shrink-0" />
            {exp.period}
          </span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <MapPin strokeWidth={1.5} className="h-3 w-3 flex-shrink-0" />
            {exp.location}
          </span>
        </div>
      </CardHeader>

      <CardContent className="pb-0 flex-1">
        <CardDescription className="text-sm leading-relaxed mb-3">
          {exp.synopsis}
        </CardDescription>
        {/* Key highlights */}
        <ul className="space-y-1.5">
          {exp.achievements.slice(0, 2).map((achievement, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
              <ChevronRight
                strokeWidth={1.5}
                className="h-3 w-3 text-primary flex-shrink-0 mt-0.5"
              />
              <span className="leading-relaxed line-clamp-2">{achievement}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="pt-4">
        <Button href={`/experience/${exp.id}`} size="sm" className="ml-auto">
          View Details
          <ArrowRight strokeWidth={1.5} className="h-3.5 w-3.5" />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ExperienceClient;

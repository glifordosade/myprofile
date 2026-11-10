import React from "react";
import {
  ArrowRight,
  Calendar,
  GitBranch,
  ExternalLink,
  Folder,
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
import { DotField } from "@/components/backgrounds/DotField";
import { PROJECTS } from "@/data/portfolioData";
import { cn } from "@/lib/utils";

export interface ProjectsSectionProps {
  className?: string;
}

export function ProjectsSection({ className }: ProjectsSectionProps) {
  const featured = PROJECTS.filter((p) => p.featured).slice(0, 3);

  return (
    <section
      id="projects"
      className={cn(
        "relative w-full min-h-screen overflow-hidden bg-background text-foreground py-24 sm:py-32",
        className
      )}
    >
      <DotField className="absolute inset-0 w-full h-full pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div data-animate className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
          <div className="space-y-3 max-w-xl">
            <Badge variant="outline">
              <Folder strokeWidth={1.5} className="h-3 w-3 text-primary" />
              Featured Projects
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-extrabold font-mono tracking-tight">
              Things I've{" "}
              <span className="text-primary">Built</span>
            </h2>
            <p className="text-muted-foreground text-base font-mono leading-relaxed">
              A selection of research and applications spanning Deep Learning, Voice Cloning, and Enterprise Web Development.
            </p>
          </div>
          <Button variant="outline" href="/projects" className="group shrink-0">
            View All Projects
            <ArrowRight
              strokeWidth={1.5}
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            />
          </Button>
        </div>

        {/* Projects Grid */}
        <div data-animate className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {featured.map((project, index) => (
            <Card
              key={project.id}
              className={cn(
                "group relative flex flex-col overflow-hidden border-border/60 bg-card/70 backdrop-blur-xs transition-all duration-300",
                "hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1",
                index === 0 && "md:col-span-2 xl:col-span-1"
              )}
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-video bg-muted/30">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 grayscale-[30%] group-hover:grayscale-0"
                  loading="lazy"
                />
                {/* Category badge overlay */}
                <div className="absolute top-3 left-3">
                  <Badge variant="muted" className="text-[10px] backdrop-blur-md bg-background/70 border-border/60">
                    {project.category}
                  </Badge>
                </div>
                {/* Link icons overlay */}
                <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-7 w-7 items-center justify-center rounded-md bg-background/80 backdrop-blur-xs border border-border/60 text-foreground hover:text-primary hover:border-primary/40 transition-all duration-200"
                      aria-label="GitHub Repository"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <GitBranch strokeWidth={1.5} className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-7 w-7 items-center justify-center rounded-md bg-background/80 backdrop-blur-xs border border-border/60 text-foreground hover:text-primary hover:border-primary/40 transition-all duration-200"
                      aria-label="Live Demo"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink strokeWidth={1.5} className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <CardHeader className="pb-2">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground mb-1.5">
                  <Calendar strokeWidth={1.5} className="h-3 w-3" />
                  <span>{project.date}</span>
                </div>
                <CardTitle className="text-base group-hover:text-primary transition-colors duration-200">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-sm line-clamp-3">
                  {project.synopsis}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1 pb-2">
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 4).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-[10px] py-0.5">
                      {tag}
                    </Badge>
                  ))}
                  {project.tags.length > 4 && (
                    <Badge variant="muted" className="text-[10px] py-0.5">
                      +{project.tags.length - 4}
                    </Badge>
                  )}
                </div>
              </CardContent>

              <CardFooter className="pt-2 border-t border-border/40">
                <Button
                  variant="ghost"
                  size="sm"
                  href={`/projects/${project.id}`}
                  className="group/btn ml-auto text-muted-foreground hover:text-primary"
                >
                  View Details
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
          <Button variant="primary" size="lg" href="/projects" className="group shadow-lg shadow-primary/20">
            Explore All Projects
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

export default ProjectsSection;

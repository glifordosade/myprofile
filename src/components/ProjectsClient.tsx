import * as React from "react";
import { PROJECTS, type Project } from "@/data/portfolioData";
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
import { Calendar, ArrowRight, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  "All",
  "AI & Deep Learning",
  "Enterprise Systems",
  "Web Development",
  "Mobile Application",
];

export function ProjectsClient() {
  const [activeCategory, setActiveCategory] = React.useState("All");
  const [searchQuery, setSearchQuery] = React.useState("");

  const filtered = PROJECTS.filter((p) => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.synopsis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-12">
          <Badge variant="secondary" className="text-xs mb-3">portfolio</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold font-mono text-foreground mb-4">
            Featured Projects
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
            A showcase of engineering systems, interactive tools, and distributed architectures.
          </p>
        </div>

        {/* Search + filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-sm">
            <Search
              strokeWidth={1.5}
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                "w-full h-9 pl-9 pr-3 rounded-[var(--radius-md)] border border-input bg-transparent",
                "text-sm font-mono text-foreground placeholder:text-muted-foreground",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
                "transition-all duration-200"
              )}
            />
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-mono font-medium border transition-all duration-200 cursor-pointer",
                activeCategory === cat
                  ? "bg-primary/15 border-primary/40 text-primary"
                  : "bg-secondary/50 border-border/60 text-muted-foreground hover:border-primary/30 hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground font-mono">
            <p className="text-lg">// No projects found</p>
            <p className="text-sm mt-2">Try adjusting your search or category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="group overflow-hidden hover:border-primary/40 hover:shadow-md hover:shadow-primary/10 transition-all duration-200 flex flex-col">
      {/* Image */}
      <div className="aspect-video overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <Badge variant="muted" className="text-xs">{project.category}</Badge>
          {project.featured && (
            <Badge variant="primary" className="text-xs">Featured</Badge>
          )}
          <span className="text-xs text-muted-foreground flex items-center gap-1 ml-auto">
            <Calendar strokeWidth={1.5} className="h-3 w-3 flex-shrink-0" />
            {project.date}
          </span>
        </div>
        <CardTitle className="text-lg leading-snug">{project.title}</CardTitle>
        <CardDescription className="line-clamp-2">{project.synopsis}</CardDescription>
      </CardHeader>

      <CardContent className="pb-0 flex-1">
        <div className="flex flex-wrap gap-1">
          {project.tags.slice(0, 5).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
          ))}
          {project.tags.length > 5 && (
            <Badge variant="muted" className="text-xs">+{project.tags.length - 5}</Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-4">
        <Button href={`/projects/${project.id}`} size="sm" className="ml-auto">
          View Project
          <ArrowRight strokeWidth={1.5} className="h-3.5 w-3.5" />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProjectsClient;

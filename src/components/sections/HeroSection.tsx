import { GradientWaves } from "@/components/backgrounds/GradientWaves";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PROFILE_DATA } from "@/data/portfolioData";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  CheckCircle2,
  Download,
  GitBranch,
  Link2,
  Mail,
  MapPin,
  Terminal,
} from "lucide-react";
import pp from "../../assets/pp.jpeg";
import resume from "../../assets/resume.pdf";

export interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className={cn(
        "relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background text-foreground py-20 lg:py-0",
        className
      )}
    >
      {/* Background: GradientWaves as per PRD Step 2 */}
      <GradientWaves
        className="absolute inset-0 w-full h-full opacity-60 dark:opacity-40 pointer-events-none"
        speed={0.4}
        waveScale={2.5}
      />

      {/* Ambient gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/40 to-background pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-16 sm:pt-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Intro & Bio */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Status Pill */}
            <div data-animate className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono font-medium shadow-xs backdrop-blur-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span>Available for high-impact projects</span>
            </div>

            {/* Title & Name */}
            <div data-animate className="space-y-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-muted-foreground uppercase tracking-widest">
                <Terminal strokeWidth={1.5} className="h-4 w-4 text-primary" />
                <span>Hello, World! I am</span>
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-mono text-foreground">
                <span className="text-primary">&gt; </span>
                {PROFILE_DATA.fullName}
              </h1>
              <p className="text-xl sm:text-2xl font-mono text-primary/90 font-semibold tracking-tight">
                {PROFILE_DATA.title}
              </p>
            </div>

            {/* Tagline / Bio summary */}
            <p data-animate className="text-base sm:text-lg text-muted-foreground max-w-2xl font-mono leading-relaxed">
              {PROFILE_DATA.tagline}
            </p>

            {/* Location & Quick Meta */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin strokeWidth={1.5} className="h-3.5 w-3.5 text-primary" />
                {PROFILE_DATA.location}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 strokeWidth={1.5} className="h-3.5 w-3.5 text-primary" />
                Andalas University (Cumlaude, GPA 3.78)
              </span>
            </div>

            {/* Call To Action Buttons */}
            <div data-animate className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                variant="primary"
                size="lg"
                href="#projects"
                className="group shadow-md shadow-primary/25"
              >
                <span>Explore Projects</span>
                <ArrowRight
                  strokeWidth={1.5}
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                />
              </Button>

              <Button
                variant="secondary"
                size="lg"
                href="#contact"
                className="group"
              >
                <Mail strokeWidth={1.5} className="h-4 w-4 text-primary" />
                <span>Get in Touch</span>
              </Button>

              <Button
                variant="outline"
                size="lg"
                href={resume}
                target="_blank"
                rel="noreferrer"
                className="group"
              >
                <Download strokeWidth={1.5} className="h-4 w-4" />
                <span>Resume / CV</span>
              </Button>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4 pt-4 border-t border-border/40 text-muted-foreground">
              <span className="text-xs font-mono uppercase tracking-wider">Connect:</span>
              <a
                href={PROFILE_DATA.socialLinks.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-md hover:text-foreground hover:bg-secondary/60 transition-colors duration-200"
                aria-label="GitHub Profile"
              >
                <GitBranch strokeWidth={1.5} className="h-4 w-4" />
              </a>
              <a
                href={PROFILE_DATA.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-md hover:text-foreground hover:bg-secondary/60 transition-colors duration-200"
                aria-label="LinkedIn Profile"
              >
                <Link2 strokeWidth={1.5} className="h-4 w-4" />
              </a>
              <a
                href={PROFILE_DATA.socialLinks.email}
                className="p-2 rounded-md hover:text-foreground hover:bg-secondary/60 transition-colors duration-200"
                aria-label="Send Email"
              >
                <Mail strokeWidth={1.5} className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Dummy Photo with High-Tech Border */}
          <div data-animate className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md">
              
              {/* Outer decorative glow & tech accents */}
              <div className="absolute -inset-1.5 bg-linear-to-r from-primary/30 to-emerald-600/30 rounded-2xl blur-md opacity-75 group-hover:opacity-100 transition duration-300" />
              
              {/* Tech Corner Crosshairs */}
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-primary z-20 pointer-events-none" />
              <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-primary z-20 pointer-events-none" />
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-primary z-20 pointer-events-none" />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-primary z-20 pointer-events-none" />

              {/* Card Container */}
              <div className="relative rounded-2xl border border-border/80 dark:border-white/15 bg-card/80 backdrop-blur-md p-3 sm:p-4 shadow-xl">
                
                {/* Tech Header Bar */}
                <div className="flex items-center justify-between px-2 pb-3 mb-2 border-b border-border/40 text-xs font-mono text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/80 inline-block" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500/80 inline-block" />
                  </div>
                  <span className="text-[11px] text-primary">USER_ID: #ZH-0941</span>
                </div>

                {/* Portrait Image */}
                <div className="relative aspect-4/5 w-full overflow-hidden rounded-xl bg-muted/40 group">
                  <img
                    src={pp.src}
                    alt="Muhammad Zhafarul Maahiy - Full-Stack Engineer"
                    className="h-full w-full object-cover object-center grayscale contrast-125 transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                    loading="eager"
                  />
                  {/* Subtle scan line grid overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-background/90 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Floating Tech Pill inside portrait */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-background/85 dark:bg-black/85 backdrop-blur-md border border-border/60">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <div>
                        <p className="font-bold text-foreground">Muhammad Zhafarul Maahiy</p>
                        <p className="text-[11px] text-muted-foreground">Bachelor of Informatics</p>
                      </div>
                      <Badge variant="primary" className="text-[10px]">
                        AI &amp; Web Dev
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Footer specs inside card */}
                <div className="mt-3 pt-2 grid grid-cols-2 gap-2 text-center text-xs font-mono">
                  <div className="p-2 rounded-lg bg-secondary/40 border border-border/40">
                    <p className="text-muted-foreground text-[10px]">GPA (Cumlaude)</p>
                    <p className="font-bold text-primary">3.78 / 4.00</p>
                  </div>
                  <div className="p-2 rounded-lg bg-secondary/40 border border-border/40">
                    <p className="text-muted-foreground text-[10px]">Focus Area</p>
                    <p className="font-bold text-foreground">Data Science &amp; AI</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default HeroSection;

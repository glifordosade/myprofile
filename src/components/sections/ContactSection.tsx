import React, { useState } from "react";
import {
  Send,
  Mail,
  GitBranch,
  Link2,
  MessageCircle,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { OrbGlow } from "@/components/backgrounds/OrbGlow";
import { PROFILE_DATA } from "@/data/portfolioData";
import { cn } from "@/lib/utils";

export interface ContactSectionProps {
  className?: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

export function ContactSection({ className }: ContactSectionProps) {
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (val: string) => {
    if (!val) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return "Please enter a valid email address";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const err = validateEmail(email);
    if (err) {
      setEmailError(err);
      return;
    }
    setEmailError("");

    if (!message.trim()) return;

    setFormStatus("loading");

    // Simulate async send — replace with real API call
    await new Promise((resolve) => setTimeout(resolve, 1600));

    // Simulate success
    setFormStatus("success");
    setEmail("");
    setMessage("");
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) setEmailError(validateEmail(e.target.value));
  };

  const SOCIAL_LINKS = [
    { icon: GitBranch, label: "GitHub", href: PROFILE_DATA.socialLinks.github },
    { icon: Link2, label: "LinkedIn", href: PROFILE_DATA.socialLinks.linkedin },
    { icon: MessageCircle, label: "WhatsApp / Phone", href: `https://wa.me/6285762045359` },
    { icon: Mail, label: "Direct Email", href: PROFILE_DATA.socialLinks.email },
  ];

  return (
    <section
      id="contact"
      className={cn(
        "relative w-full min-h-screen overflow-hidden bg-background text-foreground py-24 sm:py-32",
        className
      )}
    >
      <OrbGlow className="absolute inset-0 w-full h-full pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div data-animate className="space-y-3 mb-16 max-w-2xl mx-auto text-center">
          <Badge variant="outline" className="mx-auto">
            <MessageSquare strokeWidth={1.5} className="h-3 w-3 text-primary" />
            Get in Touch
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-extrabold font-mono tracking-tight">
            Let's Build Something{" "}
            <span className="text-primary">Together</span>
          </h2>
          <p className="text-muted-foreground text-base font-mono leading-relaxed">
            Have a project in mind, an opportunity to discuss, or just want to say hello? I'd love to hear from you.
          </p>
        </div>

        <div data-animate className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">

          {/* Left Column: Contact Info + Social Links */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-lg font-bold font-mono text-foreground">Direct Contact</h3>
              <a
                href={PROFILE_DATA.socialLinks.email}
                className="group flex items-center gap-3 p-4 rounded-xl border border-border/60 bg-card/50 hover:bg-card hover:border-primary/30 hover:shadow-md hover:shadow-primary/10 transition-all duration-200"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors duration-200 shrink-0">
                  <Mail strokeWidth={1.5} className="h-5 w-5 text-primary" />
                </span>
                <div>
                  <p className="text-xs font-mono text-muted-foreground">Email Address</p>
                  <p className="text-sm font-mono font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                    {PROFILE_DATA.email}
                  </p>
                </div>
              </a>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold font-mono text-foreground">Find Me Online</h3>
              <div className="grid grid-cols-2 gap-3">
                {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
                    className="group flex items-center gap-2.5 p-3 rounded-xl border border-border/60 bg-card/50 hover:bg-card hover:border-primary/30 hover:shadow-md hover:shadow-primary/10 transition-all duration-200"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-secondary/60 group-hover:bg-primary/15 group-hover:text-primary transition-all duration-200">
                      <Icon strokeWidth={1.5} className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-xs font-mono font-medium text-foreground/80 group-hover:text-foreground transition-colors duration-200">
                      {label}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability hint */}
            <div className="p-4 rounded-xl border border-primary/20 bg-primary/5">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                <span className="text-xs font-mono font-semibold text-primary uppercase tracking-wider">Currently Available</span>
              </div>
              <p className="text-xs font-mono text-muted-foreground leading-relaxed">
                Open to freelance projects, full-time roles, and technical consulting. Response time: within 24 hours.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="relative">
            <div className={cn(
              "rounded-2xl border border-border/60 bg-card/70 backdrop-blur-md p-6 sm:p-8 shadow-xl transition-all duration-300",
              formStatus === "success" && "border-primary/40 shadow-primary/15"
            )}>
              
              {/* Success State */}
              {formStatus === "success" ? (
                <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 border border-primary/30">
                    <CheckCircle2 strokeWidth={1.5} className="h-8 w-8 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold font-mono text-foreground">Message Sent!</h3>
                    <p className="text-sm font-mono text-muted-foreground max-w-xs">
                      Thank you for reaching out. I'll get back to you within 24 hours.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setFormStatus("idle")}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-bold font-mono text-foreground">Send a Message</h3>
                    <p className="text-xs font-mono text-muted-foreground">
                      All fields are required. Your information is kept private.
                    </p>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="text-xs font-mono font-medium text-foreground/80">
                      Your Email Address <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={handleEmailChange}
                      required
                      disabled={formStatus === "loading"}
                      className={cn(emailError && "border-destructive focus-visible:ring-destructive")}
                    />
                    {emailError && (
                      <p className="flex items-center gap-1.5 text-[11px] font-mono text-destructive">
                        <AlertCircle strokeWidth={1.5} className="h-3 w-3" />
                        {emailError}
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="text-xs font-mono font-medium text-foreground/80">
                      Message <span className="text-destructive">*</span>
                    </label>
                    <Textarea
                      id="contact-message"
                      placeholder="Tell me about your project, opportunity, or question..."
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      disabled={formStatus === "loading"}
                    />
                    <p className="text-[11px] font-mono text-muted-foreground text-right">
                      {message.length} characters
                    </p>
                  </div>

                  {/* Error Banner */}
                  {formStatus === "error" && (
                    <div className="flex items-center gap-2 p-3 rounded-lg border border-destructive/30 bg-destructive/10 text-destructive text-xs font-mono">
                      <AlertCircle strokeWidth={1.5} className="h-4 w-4 shrink-0" />
                      <span>Something went wrong. Please try again or email directly.</span>
                    </div>
                  )}

                  {/* Submit */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={formStatus === "loading" || !email || !message.trim()}
                    className="w-full shadow-md shadow-primary/25 disabled:opacity-60"
                  >
                    {formStatus === "loading" ? (
                      <>
                        <Loader2 strokeWidth={1.5} className="h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send strokeWidth={1.5} className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>

                  <p className="text-[11px] font-mono text-muted-foreground text-center">
                    Or reach me directly at{" "}
                    <a href={PROFILE_DATA.socialLinks.email} className="text-primary hover:underline">
                      {PROFILE_DATA.email}
                    </a>
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default ContactSection;

import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "secondary" | "outline" | "muted" | "destructive" | "default";
  class?: string;
  ref?: React.Ref<HTMLDivElement>;
}

export function badgeVariants({
  variant = "primary",
  className,
}: {
  variant?: BadgeProps["variant"];
  className?: string;
} = {}) {
  const variantStyles: Record<NonNullable<BadgeProps["variant"]>, string> = {
    primary:
      "border-primary/30 bg-primary/15 text-primary hover:bg-primary/25",
    default:
      "border-primary/30 bg-primary/15 text-primary hover:bg-primary/25",
    secondary:
      "border-border/50 bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline:
      "border-border text-foreground hover:bg-accent hover:text-accent-foreground",
    muted:
      "border-border/40 bg-muted text-muted-foreground hover:bg-muted/80",
    destructive:
      "border-destructive/30 bg-destructive/15 text-destructive hover:bg-destructive/25",
  };

  return cn(
    "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-mono font-medium transition-colors duration-200 select-none",
    variantStyles[variant] || variantStyles.primary,
    className
  );
}

export function Badge({
  className,
  class: classProp,
  variant = "primary",
  ref,
  ...props
}: BadgeProps) {
  return (
    <div
      ref={ref}
      className={badgeVariants({ variant, className: cn(className, classProp) })}
      {...props}
    />
  );
}

export default Badge;

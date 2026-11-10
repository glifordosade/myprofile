import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  class?: string;
  ref?: React.Ref<HTMLDivElement>;
}

export function Card({ className, class: classProp, ref, ...props }: CardProps) {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-[var(--radius)] border border-border bg-card text-card-foreground shadow-sm transition-all duration-200",
        className,
        classProp
      )}
      {...props}
    />
  );
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  class?: string;
  ref?: React.Ref<HTMLDivElement>;
}

export function CardHeader({ className, class: classProp, ref, ...props }: CardHeaderProps) {
  return (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className, classProp)}
      {...props}
    />
  );
}

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  class?: string;
  ref?: React.Ref<HTMLHeadingElement>;
}

export function CardTitle({ className, class: classProp, ref, ...props }: CardTitleProps) {
  return (
    <h3
      ref={ref}
      className={cn(
        "text-xl font-semibold leading-none tracking-tight text-card-foreground font-mono",
        className,
        classProp
      )}
      {...props}
    />
  );
}

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  class?: string;
  ref?: React.Ref<HTMLParagraphElement>;
}

export function CardDescription({ className, class: classProp, ref, ...props }: CardDescriptionProps) {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground font-mono leading-relaxed", className, classProp)}
      {...props}
    />
  );
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  class?: string;
  ref?: React.Ref<HTMLDivElement>;
}

export function CardContent({ className, class: classProp, ref, ...props }: CardContentProps) {
  return (
    <div
      ref={ref}
      className={cn("p-6 pt-0", className, classProp)}
      {...props}
    />
  );
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  class?: string;
  ref?: React.Ref<HTMLDivElement>;
}

export function CardFooter({ className, class: classProp, ref, ...props }: CardFooterProps) {
  return (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className, classProp)}
      {...props}
    />
  );
}

export default Card;

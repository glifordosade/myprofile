import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "default" | "secondary" | "outline" | "ghost" | "destructive" | "link";
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm";
  href?: string;
  target?: string;
  rel?: string;
  class?: string;
  ref?: React.Ref<HTMLButtonElement & HTMLAnchorElement>;
}

export function buttonVariants({
  variant = "primary",
  size = "default",
  className,
}: {
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
} = {}) {
  const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm shadow-primary/20 active:scale-[0.98]",
    default:
      "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm shadow-primary/20 active:scale-[0.98]",
    secondary:
      "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border/60 active:scale-[0.98]",
    outline:
      "border border-border bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground active:scale-[0.98]",
    ghost:
      "text-foreground hover:bg-accent hover:text-accent-foreground active:scale-[0.98]",
    destructive:
      "bg-destructive text-white hover:bg-destructive/90 shadow-sm active:scale-[0.98]",
    link:
      "text-primary underline-offset-4 hover:underline p-0 h-auto font-normal",
  };

  const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
    default: "h-9 px-4 py-2 text-sm",
    sm: "h-8 px-3 text-xs rounded-md",
    lg: "h-11 px-6 text-base rounded-md",
    icon: "h-9 w-9 p-0",
    "icon-sm": "h-8 w-8 p-0",
  };

  return cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-md)] font-mono text-sm font-medium transition-all duration-200 cursor-pointer select-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    variantStyles[variant] || variantStyles.primary,
    sizeStyles[size] || sizeStyles.default,
    className
  );
}

export function Button({
  className,
  class: classProp,
  variant = "primary",
  size = "default",
  href,
  children,
  ref,
  type = "button",
  ...props
}: ButtonProps) {
  const classes = buttonVariants({ variant, size, className: cn(className, classProp) });

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        ref={ref as unknown as React.Ref<HTMLAnchorElement>}
        {...(props as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;

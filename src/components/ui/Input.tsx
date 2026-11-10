import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  class?: string;
  ref?: React.Ref<HTMLInputElement>;
}

export function Input({ className, class: classProp, type = "text", ref, ...props }: InputProps) {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-9 w-full rounded-[var(--radius-md)] border border-input bg-background/60 px-3 py-1 text-sm font-mono shadow-xs transition-colors duration-200",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
        "placeholder:text-muted-foreground/70",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
        classProp
      )}
      {...props}
    />
  );
}

export default Input;

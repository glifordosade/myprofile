import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  class?: string;
  ref?: React.Ref<HTMLTextAreaElement>;
}

export function Textarea({ className, class: classProp, ref, ...props }: TextareaProps) {
  return (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[96px] w-full rounded-[var(--radius-md)] border border-input bg-background/60 px-3 py-2 text-sm font-mono shadow-xs transition-colors duration-200",
        "placeholder:text-muted-foreground/70",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "resize-y",
        className,
        classProp
      )}
      {...props}
    />
  );
}

export default Textarea;

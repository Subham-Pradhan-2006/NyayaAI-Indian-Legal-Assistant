import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-xl border border-[var(--border-subtle)]",
          "bg-[var(--bg-glass)] px-4 py-3 text-sm text-[var(--text-primary)]",
          "placeholder:text-[var(--text-muted)] resize-none",
          "focus-visible:outline-none focus-visible:border-[var(--accent-saffron)]",
          "focus-visible:ring-1 focus-visible:ring-[rgba(255,140,26,0.3)]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "transition-colors duration-200",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };

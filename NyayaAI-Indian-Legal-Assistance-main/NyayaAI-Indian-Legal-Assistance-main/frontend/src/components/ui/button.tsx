import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-br from-[#ff8c1a] to-[#f07000] text-white shadow-[0_4px_20px_rgba(255,140,26,0.3)] hover:shadow-[0_6px_28px_rgba(255,140,26,0.45)] hover:-translate-y-px",
        ghost:
          "text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:text-[var(--text-primary)] hover:border-[var(--border-accent)] hover:bg-[var(--accent-saffron-dim)]",
        outline:
          "border border-[var(--border-subtle)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--bg-glass)]",
        destructive:
          "bg-red-500/15 text-red-400 border border-red-500/25 hover:bg-red-500/25",
        jade:
          "bg-[var(--accent-jade-dim)] text-[var(--accent-jade)] border border-[rgba(16,185,129,0.25)] hover:bg-[rgba(16,185,129,0.2)]",
        link: "text-[var(--accent-saffron)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2.5",
        sm: "h-8 rounded-lg px-3.5 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

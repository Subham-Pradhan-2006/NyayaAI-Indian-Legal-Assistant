import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--accent-saffron-dim)] text-[var(--accent-saffron)] border border-[rgba(255,140,26,0.2)]",
        constitution:
          "bg-[var(--accent-saffron-dim)] text-[var(--accent-saffron)] border border-[rgba(255,140,26,0.2)]",
        case:
          "bg-[var(--accent-blue-dim)] text-[var(--accent-blue)] border border-[rgba(77,122,255,0.2)]",
        prs:
          "bg-[var(--accent-jade-dim)] text-[var(--accent-jade)] border border-[rgba(16,185,129,0.2)]",
        high:
          "bg-[rgba(16,185,129,0.12)] text-[#34d399] border border-[rgba(52,211,153,0.2)]",
        medium:
          "bg-[rgba(251,191,36,0.12)] text-[#fbbf24] border border-[rgba(251,191,36,0.2)]",
        low:
          "bg-[rgba(248,113,113,0.12)] text-[#f87171] border border-[rgba(248,113,113,0.2)]",
        outline:
          "border border-[var(--border-subtle)] text-[var(--text-secondary)] bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

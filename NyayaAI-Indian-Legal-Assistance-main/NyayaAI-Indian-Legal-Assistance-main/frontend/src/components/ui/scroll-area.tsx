"use client";

import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

// Lightweight scroll area wrapper for the chat window
const ScrollArea = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <div className="h-full w-full overflow-y-auto overflow-x-hidden [scrollbar-width:thin] [scrollbar-color:var(--text-muted)_transparent]">
      {children}
    </div>
  </div>
));
ScrollArea.displayName = "ScrollArea";

export { ScrollArea };

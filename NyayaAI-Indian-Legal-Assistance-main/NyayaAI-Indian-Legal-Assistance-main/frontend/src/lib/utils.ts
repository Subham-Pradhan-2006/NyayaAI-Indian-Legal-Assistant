import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility to merge Tailwind + conditional class names cleanly.
 * Used by all ShadCN components.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names into a single string using clsx and tailwind-merge
 * This helps avoid className conflicts when composing components
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
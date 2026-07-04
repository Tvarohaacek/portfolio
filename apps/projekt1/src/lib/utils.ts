import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Sloučí Tailwind třídy bez konfliktů (shadcn/ui konvence). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

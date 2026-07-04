import { cn } from "@/lib/utils";

interface LogoProps {
  /** Světlá varianta pro tmavé pozadí (footer, kontakt). */
  tone?: "default" | "light";
  className?: string;
}

/** Značka NaJedničku – symbol jedničky v modrém poli + wordmark. */
export function Logo({ tone = "default", className }: LogoProps) {
  return (
    <a
      href="#uvod"
      aria-label="NaJedničku – přejít na úvod"
      className={cn(
        "inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        tone === "light" && "focus-visible:ring-offset-ink-deep",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary shadow-cta"
      >
        <svg viewBox="0 0 64 64" className="size-5" fill="none">
          <path
            d="M26 22 L36 14 L36 50 M24 50 H46"
            stroke="hsl(40 100% 56%)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span
        className={cn(
          "font-display text-lg font-bold tracking-tight",
          tone === "light" ? "text-white" : "text-ink",
        )}
      >
        Na<span className="text-primary">Jedničku</span>
      </span>
    </a>
  );
}

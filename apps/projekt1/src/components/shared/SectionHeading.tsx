import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  /** Zarovnání – výchozí na střed. */
  align?: "center" | "left";
  /** Varianta pro tmavé pozadí. */
  dark?: boolean;
  className?: string;
}

/** Jednotná hlavička sekce: štítek, nadpis, perex. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "center",
  dark = false,
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <p
        className={cn(
          "mb-3 text-xs font-bold uppercase tracking-[0.18em]",
          dark ? "text-honey" : "text-primary",
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "text-balance font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl",
          dark ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={cn(
            "mt-4 text-balance text-base leading-relaxed md:text-lg",
            dark ? "text-white/75" : "text-muted-foreground",
          )}
        >
          {lead}
        </p>
      ) : null}
    </Reveal>
  );
}

import { ArrowRight, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { services } from "@/data/services";
import { prefillSubject } from "@/lib/prefill";
import { cn } from "@/lib/utils";

export function Services() {
  return (
    <section id="sluzby" className="bg-mist py-20 md:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="Nabídka služeb"
          title="S čím vám pomůžeme"
          lead="Od základů po přijímačky a maturitu. Vyberte si oblast – obsah lekcí vždy přizpůsobíme konkrétnímu studentovi."
        />

        <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal
              key={service.title}
              delay={Math.min(index * 0.06, 0.3)}
              className="h-full"
            >
              <li
                className={cn(
                  "relative flex h-full flex-col rounded-2xl border bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift",
                  service.featured
                    ? "border-primary/40 ring-2 ring-primary/20"
                    : "border-line",
                )}
              >
                {service.featured ? (
                  <Badge variant="honey" className="absolute -top-3 right-5">
                    Nejžádanější
                  </Badge>
                ) : null}

                <span
                  className={cn(
                    "grid size-12 place-items-center rounded-xl",
                    service.featured
                      ? "bg-primary text-white shadow-cta"
                      : "bg-primary-soft text-primary",
                  )}
                >
                  <service.icon aria-hidden="true" className="size-6" />
                </span>

                <h3 className="mt-5 font-display text-lg font-bold tracking-tight">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>

                <ul className="mt-4 space-y-2">
                  {service.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-2.5 text-sm text-ink"
                    >
                      <Check
                        aria-hidden="true"
                        className="mt-0.5 size-4 shrink-0 text-primary"
                      />
                      {benefit}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6">
                  <Button
                    asChild
                    variant={service.featured ? "default" : "secondary"}
                    className="w-full"
                  >
                    <a
                      href="#kontakt"
                      onClick={() => prefillSubject(service.formValue)}
                    >
                      Chci tento předmět
                      <ArrowRight aria-hidden="true" />
                    </a>
                  </Button>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { audiences } from "@/data/content";

export function Audience() {
  return (
    <section id="pro-koho" className="py-20 md:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="Pro koho"
          title="Doučování pro každého, kdo chce mít ve škole klid"
          lead="Nezáleží na tom, jestli student dohání základy, nebo míří na vysněnou školu. Plán vždy stavíme na míru."
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((audience, index) => (
            <Reveal key={audience.title} delay={Math.min(index * 0.06, 0.3)}>
              <li className="flex h-full items-start gap-4 rounded-2xl bg-mist p-6 transition-colors hover:bg-primary-soft">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-primary shadow-soft">
                  <audience.icon aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold tracking-tight">
                    {audience.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {audience.description}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

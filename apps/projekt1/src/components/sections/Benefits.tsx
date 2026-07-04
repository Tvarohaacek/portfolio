import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { benefits } from "@/data/content";

export function Benefits() {
  return (
    <section id="vyhody" className="py-20 md:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="Proč si vybrat právě nás"
          title="Doučování postavené na výsledcích, ne na odsezených hodinách"
          lead="Každá lekce má jasný cíl. Nestavíme na frontálním výkladu – stavíme na tom, co konkrétní student skutečně potřebuje."
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <Reveal key={benefit.title} delay={Math.min(index * 0.06, 0.3)}>
              <li className="group h-full rounded-2xl border border-line bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <span className="grid size-12 place-items-center rounded-xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <benefit.icon aria-hidden="true" className="size-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold tracking-tight">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {benefit.description}
                </p>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

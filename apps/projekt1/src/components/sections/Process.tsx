import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { processSteps } from "@/data/content";

export function Process() {
  return (
    <section id="prubeh" className="py-20 md:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="Jak spolupráce probíhá"
          title="Od poptávky k první jedničce v pěti krocích"
          lead="Žádné složité domlouvání. Celý začátek zvládneme do pár dnů a první lekce může proběhnout ještě tento týden."
        />

        {/* Kroky jsou skutečná sekvence – číslování zde nese informaci */}
        <ol className="relative mt-16 grid gap-10 md:grid-cols-5 md:gap-6">
          {/* Spojnice kroků */}
          <div
            aria-hidden="true"
            className="absolute bottom-2 left-6 top-2 w-px bg-line md:bottom-auto md:left-[10%] md:right-[10%] md:top-6 md:h-px md:w-auto"
          />

          {processSteps.map((step, index) => (
            <Reveal key={step.title} delay={Math.min(index * 0.08, 0.4)}>
              <li className="relative flex gap-5 md:flex-col md:gap-0 md:text-center">
                <span className="relative z-10 grid size-12 shrink-0 place-items-center rounded-full border-2 border-primary bg-white font-display text-lg font-bold text-primary shadow-soft md:mx-auto">
                  {index + 1}
                </span>
                <div className="md:mt-5">
                  <h3 className="font-display text-base font-bold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

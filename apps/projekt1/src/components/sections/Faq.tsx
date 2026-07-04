import { ArrowRight, MessageCircleQuestion } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { faqItems } from "@/data/faq";

export function Faq() {
  return (
    <section id="faq" className="py-20 md:py-28">
      <div className="container grid gap-12 lg:grid-cols-[1fr,1.6fr] lg:gap-16">
        {/* Levý sloupec – nadpis a rychlý kontakt */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            align="left"
            eyebrow="Časté dotazy"
            title="Na co se rodiče a studenti ptají nejčastěji"
            lead="Stručné odpovědi na praktické otázky kolem lekcí, cen a organizace."
          />
          <Reveal delay={0.1} className="mt-8">
            <div className="rounded-2xl border border-line bg-mist p-6">
              <span className="grid size-11 place-items-center rounded-xl bg-white text-primary shadow-soft">
                <MessageCircleQuestion aria-hidden="true" className="size-5" />
              </span>
              <h3 className="mt-4 font-display text-base font-bold tracking-tight">
                Nenašli jste odpověď?
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Napište nám přes formulář – ozveme se do 24 hodin a vše
                probereme.
              </p>
              <Button asChild size="sm" className="mt-4">
                <a href="#kontakt">
                  Napište nám
                  <ArrowRight aria-hidden="true" />
                </a>
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Pravý sloupec – akordeon */}
        <Reveal delay={0.05}>
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem key={item.question} value={`polozka-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

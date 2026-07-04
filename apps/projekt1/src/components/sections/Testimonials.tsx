import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { testimonials, type Testimonial } from "@/data/testimonials";
import { cn } from "@/lib/utils";

/** Hodnocení hvězdičkami s textovou alternativou pro čtečky. */
function Stars({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      role="img"
      aria-label={`Hodnocení ${rating} z 5 hvězdiček`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          className={cn(
            "size-4",
            index < rating ? "fill-honey text-honey" : "text-line",
          )}
        />
      ))}
    </div>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-soft">
      <div className="flex items-center justify-between">
        <Stars rating={testimonial.rating} />
        <Quote aria-hidden="true" className="size-6 text-primary-soft" />
      </div>
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink">
        „{testimonial.text}"
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
        <span
          aria-hidden="true"
          className="grid size-10 place-items-center rounded-full bg-primary-soft font-display text-sm font-bold text-primary"
        >
          {initials(testimonial.name)}
        </span>
        <div>
          <p className="text-sm font-semibold text-ink">{testimonial.name}</p>
          <p className="text-xs text-muted-foreground">{testimonial.role}</p>
        </div>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    setSnapCount(emblaApi.scrollSnapList().length);

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  return (
    <section id="reference" className="bg-mist py-20 md:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="Reference"
          title="Co říkají studenti a rodiče"
          lead="Nejlepší vizitkou jsou pro nás lepší známky, zvládnuté přijímačky a klidnější večery u domácích úkolů."
        />

        <Reveal className="mt-14">
          <div
            role="region"
            aria-roledescription="karusel"
            aria-label="Reference studentů a rodičů"
          >
            <div className="overflow-hidden" ref={emblaRef}>
              <ul className="-ml-5 flex touch-pan-y">
                {testimonials.map((testimonial) => (
                  <li
                    key={testimonial.name}
                    className="min-w-0 flex-[0_0_100%] pl-5 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                  >
                    <TestimonialCard testimonial={testimonial} />
                  </li>
                ))}
              </ul>
            </div>

            {/* Ovládání karuselu */}
            <div className="mt-8 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {Array.from({ length: snapCount }).map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => scrollTo(index)}
                    aria-label={`Přejít na recenzi ${index + 1}`}
                    aria-current={selectedIndex === index ? "true" : undefined}
                    className={cn(
                      "h-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-mist",
                      selectedIndex === index
                        ? "w-7 bg-primary"
                        : "w-2.5 bg-line hover:bg-primary/40",
                    )}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={scrollPrev}
                  aria-label="Předchozí recenze"
                  className="grid size-11 place-items-center rounded-full border border-line bg-white text-ink shadow-soft transition-colors hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <ChevronLeft aria-hidden="true" className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={scrollNext}
                  aria-label="Další recenze"
                  className="grid size-11 place-items-center rounded-full border border-line bg-white text-ink shadow-soft transition-colors hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <ChevronRight aria-hidden="true" className="size-5" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

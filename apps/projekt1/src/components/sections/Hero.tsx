import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MoveRight, Star, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Ručně kreslené podtržení klíčových slov v nadpisu. */
function HandUnderline() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 220 14"
      preserveAspectRatio="none"
      className="absolute -bottom-1.5 left-0 h-[0.35em] w-full text-honey md:-bottom-2"
    >
      <path
        d="M4 10 C 60 3, 150 2, 216 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Vizuál online lekce – karta s příkladem, pokrokem a plovoucími odznaky. */
function LessonVisual() {
  return (
    <div aria-hidden="true" className="relative mx-auto max-w-md lg:max-w-none">
      {/* Dekorativní záře */}
      <div className="absolute -left-10 top-8 size-56 rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute -right-6 bottom-4 size-48 rounded-full bg-honey/25 blur-3xl" />

      {/* Karta lekce */}
      <div className="relative rounded-3xl border border-line bg-white p-6 shadow-lift">
        <div className="flex items-center justify-between gap-3 border-b border-line pb-4">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-primary-soft font-display text-sm font-bold text-primary">
              AN
            </span>
            <div>
              <p className="text-sm font-semibold">Online lekce · Matematika</p>
              <p className="text-xs text-muted-foreground">
                Anička · 9. třída · příprava na přijímačky
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-mist px-2.5 py-1 text-xs font-semibold text-muted-foreground">
            <span className="size-1.5 animate-pulse rounded-full bg-primary" />
            živě
          </span>
        </div>

        {/* Řešený příklad – jako v sešitě */}
        <div className="mt-4 rounded-2xl bg-mist/70 p-4 font-mono text-sm leading-7 text-ink">
          <p className="text-xs font-sans font-semibold uppercase tracking-wide text-muted-foreground">
            Rovnice
          </p>
          <p className="mt-1">3(x − 2) + 4 = x + 10</p>
          <p>3x − 6 + 4 = x + 10</p>
          <p>2x = 12</p>
          <p className="mt-1 inline-flex items-center gap-2 rounded-lg bg-honey/90 px-2.5 py-0.5 font-bold text-honey-foreground">
            x = 6 ✓
          </p>
        </div>

        {/* Pokrok */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-muted-foreground">
              Připravenost na přijímačky
            </span>
            <span className="text-ink">78 %</span>
          </div>
          <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-mist">
            <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-primary to-primary-dark" />
          </div>
          <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <TrendingUp className="size-3.5 text-primary" />
            +24 % za poslední měsíc
          </p>
        </div>
      </div>

      {/* Plovoucí odznak: zlepšení známky – podpis značky */}
      <div className="absolute -right-3 -top-6 rounded-2xl border border-line bg-white px-4 py-3 shadow-lift motion-safe:animate-float sm:-right-6">
        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          Pololetí · matematika
        </p>
        <p className="mt-0.5 flex items-center gap-2 font-display text-2xl font-bold">
          <span className="text-muted-foreground/60 line-through decoration-2">
            3
          </span>
          <MoveRight className="size-5 text-primary" />
          <span className="grid size-9 place-items-center rounded-xl bg-honey text-honey-foreground shadow-soft">
            1
          </span>
        </p>
      </div>

      {/* Plovoucí odznak: mini recenze */}
      <div className="absolute -bottom-6 -left-2 rounded-2xl border border-line bg-white px-4 py-3 shadow-lift motion-safe:animate-float motion-safe:[animation-delay:1.6s] sm:-left-6">
        <div className="flex items-center gap-0.5 text-honey">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} className="size-3.5 fill-current" />
          ))}
        </div>
        <p className="mt-1 text-xs font-medium text-ink">
          „Konečně tomu rozumím."
        </p>
      </div>
    </div>
  );
}

export function Hero() {
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.6,
            delay,
            ease: [0.21, 0.47, 0.32, 0.98] as const,
          },
        };

  return (
    <section id="uvod" className="relative overflow-hidden pb-24 pt-32 md:pb-32 md:pt-40">
      {/* Čtverečkovaný sešit s jemným vytrácením */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-grid-paper [mask-image:radial-gradient(ellipse_120%_80%_at_50%_0%,black_35%,transparent_78%)]"
      />

      <div className="container grid items-center gap-14 lg:grid-cols-[1.05fr,0.95fr] lg:gap-10">
        {/* Textová část */}
        <div className="max-w-xl lg:max-w-none">
          <motion.p
            {...fadeUp(0)}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5 text-xs font-semibold text-muted-foreground shadow-soft"
          >
            <span className="size-1.5 rounded-full bg-honey" />
            Online doučování · ZŠ a SŠ · celá ČR
          </motion.p>

          <motion.h1
            {...fadeUp(0.08)}
            className="mt-6 text-balance font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl md:text-6xl"
          >
            Doučování, které je vidět{" "}
            <span className="relative inline-block whitespace-nowrap">
              na známkách
              <HandUnderline />
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.16)}
            className="mt-6 text-balance text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Individuální online lekce matematiky a českého jazyka. Připravíme
            vás na přijímačky i maturitu – srozumitelně, v klidu a podle vašeho
            tempa.
          </motion.p>

          <motion.div
            {...fadeUp(0.24)}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Button asChild size="xl">
              <a href="#kontakt">
                Nezávazná konzultace zdarma
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
            <Button asChild size="xl" variant="secondary">
              <a href="#sluzby">Prohlédnout služby</a>
            </Button>
          </motion.div>

          {/* Důvěryhodnost */}
          <motion.ul
            {...fadeUp(0.32)}
            className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm font-semibold text-ink"
          >
            <li className="flex items-center gap-2">
              <Star aria-hidden="true" className="size-4 fill-honey text-honey" />
              4,9/5
              <span className="font-normal text-muted-foreground">
                z 60+ hodnocení
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Users aria-hidden="true" className="size-4 text-primary" />
              200+
              <span className="font-normal text-muted-foreground">
                spokojených studentů
              </span>
            </li>
            <li className="flex items-center gap-2">
              <TrendingUp aria-hidden="true" className="size-4 text-primary" />
              92 %
              <span className="font-normal text-muted-foreground">
                úspěšnost u přijímaček
              </span>
            </li>
          </motion.ul>
        </div>

        {/* Vizuál */}
        <motion.div
          {...(reduceMotion
            ? {}
            : {
                initial: { opacity: 0, scale: 0.96, y: 24 },
                animate: { opacity: 1, scale: 1, y: 0 },
                transition: {
                  duration: 0.7,
                  delay: 0.2,
                  ease: [0.21, 0.47, 0.32, 0.98] as const,
                },
              })}
        >
          <LessonVisual />
        </motion.div>
      </div>
    </section>
  );
}

import {
  Backpack,
  CalendarClock,
  GraduationCap,
  Laptop,
  LifeBuoy,
  LineChart,
  Rocket,
  School,
  SlidersHorizontal,
  Sparkles,
  Target,
  UserRound,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Proč si vybrat právě nás                                            */
/* ------------------------------------------------------------------ */

export interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const benefits: Benefit[] = [
  {
    icon: UserRound,
    title: "Individuální přístup 1:1",
    description:
      "Žádná skupina, žádné čekání. Celá lekce se věnuje jen jednomu studentovi, jeho tempu a jeho otázkám.",
  },
  {
    icon: Laptop,
    title: "Online z pohodlí domova",
    description:
      "Bez dojíždění a ztraceného času. Stačí počítač s kamerou – tabuli, materiály i cvičení sdílíme přímo v lekci.",
  },
  {
    icon: CalendarClock,
    title: "Flexibilní termíny",
    description:
      "Lekce plánujeme podle rozvrhu studenta – odpoledne, večer i o víkendu. Přesun termínu do 24 hodin je zdarma.",
  },
  {
    icon: LineChart,
    title: "Měřitelný pokrok",
    description:
      "Po každé lekci dostanete krátké shrnutí, co se povedlo a co nás čeká. Pokrok je vidět černé na bílém.",
  },
  {
    icon: SlidersHorizontal,
    title: "Výuka přesně na míru",
    description:
      "Na první lekci zmapujeme mezery a sestavíme plán. Připravujeme přesně na to, co studenta čeká ve škole i u zkoušek.",
  },
  {
    icon: Sparkles,
    title: "Moderní materiály",
    description:
      "Interaktivní tabule, přehledné zápisky z každé lekce a testy nanečisto ve formátu CERMAT. Vše v ceně.",
  },
];

/* ------------------------------------------------------------------ */
/* Jak spolupráce probíhá                                              */
/* ------------------------------------------------------------------ */

export interface ProcessStep {
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    title: "Odešlete poptávku",
    description:
      "Vyplnění formuláře zabere dvě minuty. Napište, s čím student potřebuje pomoct.",
  },
  {
    title: "Ozveme se vám",
    description:
      "Do 24 hodin se spojíme a v krátké konzultaci zdarma probereme cíle i očekávání.",
  },
  {
    title: "Domluvíme plán",
    description:
      "Nastavíme frekvenci lekcí a termíny, které sednou do rozvrhu studenta.",
  },
  {
    title: "Začneme s výukou",
    description:
      "Online lekce se sdílenou tabulí. Zápisky z každé hodiny zůstávají studentovi.",
  },
  {
    title: "Sledujeme pokrok",
    description:
      "Průběžně vyhodnocujeme posun a plán upravujeme. O všem máte přehled.",
  },
];

/* ------------------------------------------------------------------ */
/* Pro koho je doučování vhodné                                        */
/* ------------------------------------------------------------------ */

export interface AudienceItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const audiences: AudienceItem[] = [
  {
    icon: Backpack,
    title: "Žáci ZŠ",
    description: "Doplnění základů a příprava na písemky od 1. do 9. třídy.",
  },
  {
    icon: School,
    title: "Studenti SŠ",
    description: "Průběžná pomoc s látkou, která ve škole letí moc rychle.",
  },
  {
    icon: GraduationCap,
    title: "Maturanti",
    description: "Systematická příprava na didaktické testy i ústní zkoušku.",
  },
  {
    icon: Target,
    title: "Uchazeči o SŠ",
    description: "Přijímačky CERMAT na střední školy a víceletá gymnázia.",
  },
  {
    icon: LifeBuoy,
    title: "Studenti s obtížemi",
    description: "Trpělivé dovysvětlení tam, kde běžný výklad nestačí.",
  },
  {
    icon: Rocket,
    title: "Ambiciózní studenti",
    description: "Náskok, soutěže a jistota u zkoušek pro ty, kdo míří výš.",
  },
];

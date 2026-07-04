import {
  Blocks,
  BookOpenText,
  Calculator,
  GraduationCap,
  Target,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  benefits: string[];
  /** Hodnota, která se předvyplní do pole „Předmět" v kontaktním formuláři. */
  formValue: string;
  /** Zvýrazněná karta s odznakem. */
  featured?: boolean;
}

export const services: Service[] = [
  {
    icon: Calculator,
    title: "Online doučování matematiky",
    description:
      "Od zlomků po derivace. Srozumitelně vysvětlíme látku ZŠ i SŠ a doženeme vše, co ve škole uteklo.",
    benefits: [
      "Látka ZŠ a SŠ krok za krokem",
      "Příprava na písemky a zkoušení",
      "Pochopení místo memorování",
    ],
    formValue: "Matematika",
  },
  {
    icon: BookOpenText,
    title: "Online doučování češtiny",
    description:
      "Pravopis, větné rozbory, sloh i literatura. Čeština přehledně a bez pouček, kterým nikdo nerozumí.",
    benefits: [
      "Pravopis a mluvnice v souvislostech",
      "Rozbory textu a literatura",
      "Slohové práce krok za krokem",
    ],
    formValue: "Český jazyk",
  },
  {
    icon: Target,
    title: "Příprava na přijímačky CERMAT",
    description:
      "Kompletní příprava na jednotné přijímací zkoušky z matematiky a češtiny na SŠ a víceletá gymnázia.",
    benefits: [
      "Strategie řešení testů CERMAT",
      "Testy nanečisto s vyhodnocením",
      "Práce s časem a se stresem",
    ],
    formValue: "Přijímací zkoušky CERMAT",
    featured: true,
  },
  {
    icon: GraduationCap,
    title: "Příprava na maturitu",
    description:
      "Didaktické testy, ústní zkouška i sloh. Systematická příprava podle aktuální podoby maturity.",
    benefits: [
      "Didaktický test z ČJ a matematiky",
      "Nácvik ústní zkoušky",
      "Rozbor slohových prací",
    ],
    formValue: "Příprava na maturitu",
  },
  {
    icon: Blocks,
    title: "Ostatní předměty",
    description:
      "Angličtina, fyzika, chemie nebo informatika? Napište nám a domluvíme individuální plán.",
    benefits: [
      "Dle individuální domluvy",
      "AJ · fyzika · chemie · IT",
      "Stejný přístup 1:1",
    ],
    formValue: "Jiný předmět",
  },
];

export interface Testimonial {
  name: string;
  role: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Petra Horáková",
    role: "maminka žákyně 9. třídy",
    rating: 5,
    text: "Dcera se díky přípravě dostala na gymnázium, které chtěla. Testy nanečisto jí sedly – u přijímaček prý nebylo nic, co by ji překvapilo.",
  },
  {
    name: "Tomáš Veselý",
    role: "student 3. ročníku SŠ",
    rating: 5,
    text: "Funkce a logaritmy pro mě byly španělská vesnice. Po pár lekcích jsem psal písemku za dvojku a konečně u toho nepanikařím.",
  },
  {
    name: "Lucie Křížová",
    role: "maminka sedmáka",
    rating: 5,
    text: "Oceňuji shrnutí po každé lekci. Přesně vím, co se probíralo a jak se syn zlepšuje. Známky šly nahoru během dvou měsíců.",
  },
  {
    name: "Martin Dvořák",
    role: "letošní maturant",
    rating: 5,
    text: "Didaktický test z češtiny jsem podcenil. Za tři měsíce jsme prošli všechno podstatné a maturitu jsem dal v klidu na 86 %.",
  },
  {
    name: "Alena Svobodová",
    role: "maminka osmačky",
    rating: 4,
    text: "Hledali jsme doučování, které zvládneme při kroužcích. Termíny se vždy podařilo najít, jen oblíbené časy bývají obsazené. Jinak naprostá spokojenost.",
  },
  {
    name: "Jakub Rada",
    role: "student 2. ročníku SŠ",
    rating: 5,
    text: "Nejvíc mi dalo, že se můžu zeptat na cokoliv bez divných pohledů. Věci konečně chápu, nejen se je učím nazpaměť.",
  },
];

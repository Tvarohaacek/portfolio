export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Pozn.: Při úpravě otázek aktualizujte i FAQPage JSON-LD v index.html,
 * aby strukturovaná data odpovídala obsahu stránky.
 */
export const faqItems: FaqItem[] = [
  {
    question: "Jak probíhá první lekce?",
    answer:
      "Před první lekcí si krátce zavoláme – konzultace je zdarma a nezávazná. Na úvodní lekci pak zmapujeme, co student umí, kde jsou mezery, a domluvíme si konkrétní plán a cíle.",
  },
  {
    question: "Co potřebujeme k online výuce?",
    answer:
      "Stačí počítač nebo notebook s kamerou, mikrofonem a stabilním internetem. Lekce probíhají přes Google Meet a sdílenou interaktivní tabuli – vše je zdarma a nic se neinstaluje.",
  },
  {
    question: "Jak dlouho trvá jedna lekce?",
    answer:
      "Standardní lekce trvá 60 minut. U příprav na přijímačky a maturitu se osvědčily i 90minutové bloky – záleží na věku studenta a domluvě.",
  },
  {
    question: "Kolik doučování stojí?",
    answer:
      "Individuální lekce 60 minut vychází od 400 Kč podle předmětu a ročníku. Při nákupu balíčku 10 lekcí získáte zvýhodněnou cenu. Konkrétní nabídku dostanete po nezávazné konzultaci.",
  },
  {
    question: "Jak často by měly lekce probíhat?",
    answer:
      "Nejčastěji jednou až dvakrát týdně. Před přijímačkami a maturitou doporučujeme frekvenci zvýšit. Plán vždy nastavíme podle cíle a časových možností studenta.",
  },
  {
    question: "Co když nám termín nevyjde?",
    answer:
      "Lekci lze zdarma přesunout nebo zrušit nejpozději 24 hodin předem. Hledáme náhradní termín, aby student nevypadl z tempa.",
  },
  {
    question: "Jak probíhá platba?",
    answer:
      "Platí se převodem na účet – buď po jednotlivých lekcích, nebo předem za balíček. Žádné závazky ani dlouhodobé smlouvy.",
  },
  {
    question: "Za jak dlouho uvidíme výsledky?",
    answer:
      "První posun bývá vidět po 4–6 týdnech pravidelných lekcí – student se přestává bát ptát a zvládá úlohy samostatněji. Známky se obvykle zlepšují během jednoho pololetí.",
  },
  {
    question: "Doučujete i jiné předměty než matematiku a češtinu?",
    answer:
      "Ano, po domluvě také angličtinu, fyziku, chemii či informatiku. Napište nám do poznámky, o jaký předmět máte zájem, a ozveme se s možnostmi.",
  },
  {
    question: "Jsou lekce vhodné i pro mladší děti?",
    answer:
      "Ano, online formu zvládají už žáci od 3.–4. třídy. U mladších dětí volíme kratší aktivity, časté střídání tempa a úzkou komunikaci s rodiči.",
  },
];

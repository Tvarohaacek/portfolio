/** Sestaví URL stock fotky z Unsplash v požadované šířce. */
export const unsplash = (id: string, w = 1600): string =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

/* ------------------------------------------------------------------ */
/* Restaurace                                                          */
/* ------------------------------------------------------------------ */

export interface MenuItem {
  name: string;
  desc: string;
  price: number;
}

export const menu: MenuItem[] = [
  {
    name: "Paštika z divočáka",
    desc: "nakládané hříbky, kvasový chléb",
    price: 165,
  },
  {
    name: "Kulajda",
    desc: "lesní houby, zastřené vejce, kopr",
    price: 95,
  },
  {
    name: "Pstruh po mlynářsku",
    desc: "máslové brambory, mandle, citron",
    price: 315,
  },
  {
    name: "Srnčí hřbet",
    desc: "glazovaná mrkev, jalovcová omáčka",
    price: 395,
  },
  {
    name: "Zelenina z grilu",
    desc: "kozí sýr z Kašperek, řeřicha",
    price: 245,
  },
  {
    name: "Borůvkové knedlíky",
    desc: "tvaroh, máta, přepuštěné máslo",
    price: 145,
  },
];

/* ------------------------------------------------------------------ */
/* Penzion                                                             */
/* ------------------------------------------------------------------ */

export interface Room {
  name: string;
  desc: string;
  meta: string;
  price: string;
  img: string;
  alt: string;
}

export const rooms: Room[] = [
  {
    name: "Pokoj Smrk",
    desc: "Dvoulůžkový pokoj s ranním sluncem a výhledem přímo do lesa.",
    meta: "2 osoby · 22 m² · sprcha",
    price: "od 1\u00a0890\u00a0Kč / noc",
    img: unsplash("photo-1505693416388-ac5ce068fe85", 1000),
    alt: "Světlý dvoulůžkový pokoj s dřevěnou postelí",
  },
  {
    name: "Pokoj Buk",
    desc: "Prostornější pokoj s balkonem nad zahradou a vanou.",
    meta: "2 osoby · 26 m² · balkon",
    price: "od 2\u00a0190\u00a0Kč / noc",
    img: unsplash("photo-1540518614846-7eded433c457", 1000),
    alt: "Útulný pokoj s velkou postelí a lampou",
  },
  {
    name: "Apartmán Paseka",
    desc: "Dva pokoje, kamna a kuchyňka pod krovem – pro rodiny.",
    meta: "4 osoby · 44 m² · kamna",
    price: "od 3\u00a0400\u00a0Kč / noc",
    img: unsplash("photo-1522708323590-d24dbb6b0267", 1000),
    alt: "Obývací část apartmánu s pohovkou a dřevěnými prvky",
  },
];

/* ------------------------------------------------------------------ */
/* Okolí                                                               */
/* ------------------------------------------------------------------ */

export interface Spot {
  title: string;
  desc: string;
  img: string;
  alt: string;
}

export const spots: Spot[] = [
  {
    title: "Prášilské jezero",
    desc: "4,5 km lesní pěšinou přímo od domu.",
    img: unsplash("photo-1439066615861-d1af74d74000", 900),
    alt: "Molo na klidném jezeře obklopeném lesem",
  },
  {
    title: "Poledník, 1\u00a0315 m",
    desc: "Rozhledna nad starým hvozdem, 2 hodiny chůze.",
    img: unsplash("photo-1470071459604-3b5ec3a7fe05", 900),
    alt: "Zamlžené zalesněné kopce při východu slunce",
  },
  {
    title: "Povydří",
    desc: "Kaňon řeky Vydry s obřími balvany.",
    img: unsplash("photo-1504893524553-b855bce32c67", 900),
    alt: "Řeka protékající mezi kameny",
  },
  {
    title: "Houbařské revíry",
    desc: "Mapku ověřených míst dostanete u snídaně.",
    img: unsplash("photo-1518495973542-4542c06a5843", 900),
    alt: "Sluneční paprsky pronikající korunami stromů",
  },
];

/* ------------------------------------------------------------------ */
/* Navigace                                                            */
/* ------------------------------------------------------------------ */

export interface NavLink {
  href: string;
  label: string;
}

export const navLinks: NavLink[] = [
  { href: "#o-pasece", label: "O Pasece" },
  { href: "#restaurace", label: "Restaurace" },
  { href: "#pokoje", label: "Pokoje" },
  { href: "#okoli", label: "Okolí" },
  { href: "#kontakt", label: "Kontakt" },
];

import { Facebook, Instagram, Youtube, type LucideIcon } from "lucide-react";

/**
 * Centrální konfigurace webu.
 * Kontakty, odkazy i texty ve footeru stačí měnit jen tady.
 */
export const site = {
  name: "NaJedničku",
  claim: "Online doučování, které je vidět na známkách.",
  url: "https://www.najednicku.cz",
  email: "doucovani@najednicku.cz",
  phone: "+420 777 123 456",
  phoneHref: "tel:+420777123456",
  availability: "Po–Pá 14:00–20:00",
  area: "Online – po celé ČR",
} as const;

export interface NavItem {
  label: string;
  href: `#${string}`;
  id: string;
}

export const navItems: NavItem[] = [
  { label: "Výhody", href: "#vyhody", id: "vyhody" },
  { label: "Služby", href: "#sluzby", id: "sluzby" },
  { label: "Průběh", href: "#prubeh", id: "prubeh" },
  { label: "Reference", href: "#reference", id: "reference" },
  { label: "FAQ", href: "#faq", id: "faq" },
];

export interface SocialLink {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const socialLinks: SocialLink[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/najednicku",
    icon: Instagram,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/najednicku",
    icon: Facebook,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@najednicku",
    icon: Youtube,
  },
];

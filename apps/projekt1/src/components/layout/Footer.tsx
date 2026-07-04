import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { navItems, site, socialLinks } from "@/data/site";
import { services } from "@/data/services";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-deep text-white">
      <div className="container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr,1fr,1fr,1.2fr] lg:gap-8">
        {/* Značka */}
        <div>
          <Logo tone="light" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
            {site.claim} Individuální online lekce pro žáky ZŠ, studenty SŠ
            a maturanty.
          </p>
          <ul className="mt-5 flex gap-3">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="grid size-10 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-honey hover:text-honey focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey"
                >
                  <social.icon aria-hidden="true" className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Navigace */}
        <nav aria-label="Navigace v patičce">
          <h2 className="font-display text-sm font-bold uppercase tracking-[0.15em] text-white/50">
            Navigace
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className="text-white/75 transition-colors hover:text-honey focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey rounded"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#kontakt"
                className="text-white/75 transition-colors hover:text-honey focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey rounded"
              >
                Kontakt
              </a>
            </li>
          </ul>
        </nav>

        {/* Služby */}
        <nav aria-label="Služby v patičce">
          <h2 className="font-display text-sm font-bold uppercase tracking-[0.15em] text-white/50">
            Služby
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.map((service) => (
              <li key={service.title}>
                <a
                  href="#sluzby"
                  className="text-white/75 transition-colors hover:text-honey focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey rounded"
                >
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Kontakt */}
        <div>
          <h2 className="font-display text-sm font-bold uppercase tracking-[0.15em] text-white/50">
            Kontakt
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2.5 text-white/75 transition-colors hover:text-honey focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey rounded"
              >
                <Mail aria-hidden="true" className="size-4 shrink-0" />
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-2.5 text-white/75 transition-colors hover:text-honey focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey rounded"
              >
                <Phone aria-hidden="true" className="size-4 shrink-0" />
                {site.phone}
              </a>
            </li>
            <li className="inline-flex items-center gap-2.5 text-white/75">
              <Clock aria-hidden="true" className="size-4 shrink-0" />
              {site.availability}
            </li>
            <li className="inline-flex items-center gap-2.5 text-white/75">
              <MapPin aria-hidden="true" className="size-4 shrink-0" />
              {site.area}
            </li>
          </ul>
        </div>
      </div>

      {/* Spodní lišta */}
      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/50 sm:flex-row">
          <p>
            © {year} {site.name} – online doučování. Všechna práva vyhrazena.
          </p>
          <a
            href="#"
            className="transition-colors hover:text-honey focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey rounded"
          >
            Zásady ochrany osobních údajů
          </a>
        </div>
      </div>
    </footer>
  );
}

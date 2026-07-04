import { useEffect, useState } from "react";
import { navLinks } from "../data.ts";
import Logo from "./Logo.tsx";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", open);
    return () => document.body.classList.remove("no-scroll");
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`nav${scrolled || open ? " nav--solid" : ""}`}>
      <div className="container nav__inner">
        <a className="nav__brand" href="#uvod" onClick={close}>
          <Logo />
          <span>Paseka</span>
        </a>

        <nav className="nav__links" aria-label="Hlavní navigace">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <a className="btn btn--small nav__cta" href="#kontakt">
          Rezervace
        </a>

        <button
          type="button"
          className="nav__burger"
          aria-expanded={open}
          aria-label={open ? "Zavřít menu" : "Otevřít menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </div>

      {open && (
        <nav className="nav__overlay" aria-label="Mobilní navigace">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={close}>
              {l.label}
            </a>
          ))}
          <a className="btn nav__overlay-cta" href="#kontakt" onClick={close}>
            Rezervace
          </a>
        </nav>
      )}
    </header>
  );
}

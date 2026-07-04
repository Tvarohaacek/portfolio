import { navLinks } from "../data.ts";
import Logo from "./Logo.tsx";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <a className="footer__brand" href="#uvod">
          <Logo />
          <span>Paseka</span>
        </a>

        <nav aria-label="Patička – navigace">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="container footer__bottom">
        <span>© 2026 Paseka – restaurace &amp; penzion</span>
        <span>Fiktivní prezentace · fotografie Unsplash</span>
      </div>
    </footer>
  );
}

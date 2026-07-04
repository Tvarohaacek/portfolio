import { FormEvent, useState } from "react";

const hours = [
  { label: "Restaurace", value: "Út–Ne 11:30–22:00" },
  { label: "Kuchyně", value: "do 21:00" },
  { label: "Pondělí", value: "zavřeno" },
  { label: "Check-in", value: "14:00–20:00" },
  { label: "Check-out", value: "do 10:30" },
];

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="kontakt" className="section contact">
      <div className="container contact__grid">
        <div className="contact__info-col">
          <p className="eyebrow eyebrow--light">Kontakt &amp; rezervace</p>
          <h2>Přijeďte se ztišit</h2>
          <p className="contact__lead">
            Napište nám, zavolejte, nebo se prostě zastavte cestou z lesa. Na
            rezervace odpovídáme do 24 hodin.
          </p>

          <ul className="contact__info">
            <li>
              <span>Adresa</span>
              <strong>Paseka 1, 341 92 Prášily</strong>
            </li>
            <li>
              <span>Telefon</span>
              <strong>
                <a href="tel:+420376512210">+420 376 512 210</a>
              </strong>
            </li>
            <li>
              <span>E-mail</span>
              <strong>
                <a href="mailto:rezervace@paseka-prasily.cz">
                  rezervace@paseka-prasily.cz
                </a>
              </strong>
            </li>
          </ul>

          <dl className="hours">
            {hours.map((h) => (
              <div key={h.label}>
                <dt>{h.label}</dt>
                <dd>{h.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {sent ? (
          <div className="form__sent" role="status">
            <strong>Děkujeme za zprávu.</strong>
            <p>Ozveme se vám do 24 hodin na uvedený e-mail.</p>
          </div>
        ) : (
          <form className="form" onSubmit={handleSubmit}>
            <label>
              Jméno
              <input type="text" name="name" required placeholder="Jana Nováková" />
            </label>
            <label>
              E-mail
              <input
                type="email"
                name="email"
                required
                placeholder="jana@priklad.cz"
              />
            </label>
            <label>
              Termín
              <input
                type="text"
                name="date"
                placeholder="např. 14.–16. 8. 2026, 2 osoby"
              />
            </label>
            <label>
              Zpráva
              <textarea
                name="message"
                rows={5}
                placeholder="Rádi bychom přijeli na víkend a večer povečeřeli u vás…"
              />
            </label>
            <button type="submit" className="btn btn--light">
              Odeslat poptávku
            </button>
            <p className="form__note">
              Ukázkový formulář – nikam se neodesílá.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

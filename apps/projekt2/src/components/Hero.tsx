import { unsplash } from "../data.ts";

const heroImage = unsplash("photo-1441974231531-c6227db76b6e", 2000);

export default function Hero() {
  return (
    <section
      id="uvod"
      className="hero"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="hero__scrim" aria-hidden="true" />

      <div className="container hero__content">
        <p className="eyebrow eyebrow--light">Restaurace &amp; penzion · Šumava</p>
        <h1>Paseka</h1>
        <p className="hero__lead">
          Šablona webu, který může mít i vaše restaurace, nebo penzion! Nebo cokoliv jiného... v kreativitě se meze nekladou
        </p>
        <div className="hero__actions">
          <a className="btn btn--light" href="#kontakt">
            Rezervovat stůl
          </a>
          <a className="btn btn--ghost" href="#pokoje">
            Prohlédnout pokoje
          </a>
        </div>
      </div>

      <div className="container hero__meta">
        <span>Prášily 1, Šumava</span>
        <span>890 m n. m.</span>
        <span>Út–Ne 11:30–22:00</span>
      </div>
    </section>
  );
}

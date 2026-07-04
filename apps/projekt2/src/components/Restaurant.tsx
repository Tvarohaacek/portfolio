import { menu, unsplash } from "../data.ts";

export default function Restaurant() {
  return (
    <section id="restaurace" className="section section--tinted">
      <div className="container section__head">
        <div>
          <p className="eyebrow">Restaurace</p>
          <h2>Vaříme podle lesa a podle sezóny</h2>
        </div>
        <p className="section__intro">
          Lístek měníme každých šest týdnů podle toho, co zrovna roste, zraje a
          loví se. Pár věcí ale zůstává: kulajda, knedlíky a pivo z malého
          pivovaru v Sušici.
        </p>
      </div>

      <div className="container restaurant">
        <div className="restaurant__media">
          <img
            src={unsplash("photo-1414235077428-338989a2e8c0", 1200)}
            alt="Interiér restaurace s dřevěnými stoly a měkkým světlem"
            loading="lazy"
          />
          <img
            src={unsplash("photo-1467003909585-2f8a72700288", 900)}
            alt="Talíř s pstruhem a čerstvými bylinkami"
            loading="lazy"
          />
        </div>

        <div className="restaurant__menu">
          <h3 className="menu__title">Ochutnávka z letního lístku</h3>
          <ul className="menu">
            {menu.map((m) => (
              <li key={m.name} className="menu__item">
                <span className="menu__name">{m.name}</span>
                <span className="menu__price">{m.price}&nbsp;Kč</span>
                <span className="menu__desc">{m.desc}</span>
              </li>
            ))}
          </ul>
          <p className="menu__note">
            Kuchyně vaří Út–Ne 11:30–21:00. Bezmasé a bezlepkové varianty rádi
            připravíme, stačí dát vědět den předem.
          </p>
          <a className="btn" href="#kontakt">
            Rezervovat stůl
          </a>
        </div>
      </div>
    </section>
  );
}

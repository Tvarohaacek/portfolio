import { unsplash } from "../data.ts";

export default function Intro() {
  return (
    <section id="o-pasece" className="section">
      <div className="container intro">
        <div className="intro__text">
          <p className="eyebrow">O Pasece</p>
          <h2>Dům na konci cesty, kde končí i spěch</h2>
          <p>
            Bývalou hájovnu z roku 1927 jsme šest let opravovali tak, aby z ní
            nezmizel les. Dřevo, kámen, len a hlína – víc jsme toho
            nepotřebovali. Přes den vaříme, večer topíme v kamnech a ráno
            nosíme na stůl chleba, který ještě voní kvasem.
          </p>
          <p>
            Vaříme z toho, co dá okolí: zvěřinu od prášilských myslivců,
            pstruhy ze sádek pod Poledníkem a houby s borůvkami z lesa, který
            začíná hned za naším plotem.
          </p>
          <p className="intro__sign">Marie a Jan Havlovi, vaši hostitelé</p>
        </div>

        <figure className="intro__media">
          <img
            src={unsplash("photo-1518780664697-55e3ad937233", 1200)}
            alt="Dřevěný dům Paseky na kraji louky"
            loading="lazy"
          />
          <figcaption>
            Bývalá hájovna, dnes deset pokojů a čtyřicet míst u stolu.
          </figcaption>
        </figure>
      </div>

      <div className="container">
        <ul className="stats">
          <li>
            <strong>1927</strong>
            <span>postavena hájovna</span>
          </li>
          <li>
            <strong>10</strong>
            <span>pokojů v patře</span>
          </li>
          <li>
            <strong>40</strong>
            <span>míst u stolu</span>
          </li>
          <li>
            <strong>0</strong>
            <span>televizí na pokojích</span>
          </li>
        </ul>
      </div>
    </section>
  );
}

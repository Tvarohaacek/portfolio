import { spots } from "../data.ts";

export default function Surroundings() {
  return (
    <section id="okoli" className="section section--tinted">
      <div className="container section__head">
        <div>
          <p className="eyebrow">Okolí</p>
          <h2>Les začíná za prahem</h2>
        </div>
        <p className="section__intro">
          Z terasy vidíte na Poledník, k jezeru dojdete pěšky a na kole jste za
          hodinu na Modravě. Mapy a tipy na cesty dostanete u snídaně.
        </p>
      </div>

      <div className="container spots">
        {spots.map((spot) => (
          <article key={spot.title} className="spot">
            <div className="spot__media">
              <img src={spot.img} alt={spot.alt} loading="lazy" />
            </div>
            <h3>{spot.title}</h3>
            <p>{spot.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

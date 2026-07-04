import { rooms } from "../data.ts";

export default function Rooms() {
  return (
    <section id="pokoje" className="section">
      <div className="container section__head">
        <div>
          <p className="eyebrow">Penzion</p>
          <h2>Deset pokojů, žádné televize</h2>
        </div>
        <p className="section__intro">
          Zařídili jsme je střídmě: postele z jasanového masivu, lněné povlečení
          a okna do korun stromů. Wi-fi tu je – ale výhled je lepší.
        </p>
      </div>

      <div className="container rooms">
        {rooms.map((room) => (
          <article key={room.name} className="room">
            <div className="room__media">
              <img src={room.img} alt={room.alt} loading="lazy" />
            </div>
            <div className="room__body">
              <h3>{room.name}</h3>
              <p className="room__meta">{room.meta}</p>
              <p className="room__desc">{room.desc}</p>
              <p className="room__price">{room.price}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="container section__foot">
        <p>
          Ceny zahrnují snídani z místních surovin. Děti do 6 let bydlí zdarma,
          pes je vítán po domluvě.
        </p>
        <a className="btn" href="#kontakt">
          Ověřit volný termín
        </a>
      </div>
    </section>
  );
}

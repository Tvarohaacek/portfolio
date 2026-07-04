import Nav from "./components/Nav.tsx";
import Hero from "./components/Hero.tsx";
import Intro from "./components/Intro.tsx";
import Restaurant from "./components/Restaurant.tsx";
import Rooms from "./components/Rooms.tsx";
import Surroundings from "./components/Surroundings.tsx";
import Contact from "./components/Contact.tsx";
import Footer from "./components/Footer.tsx";

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Intro />
        <Restaurant />
        <Rooms />
        <Surroundings />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

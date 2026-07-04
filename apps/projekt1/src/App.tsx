import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Benefits } from "@/components/sections/Benefits";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Audience } from "@/components/sections/Audience";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  return (
    <>
      {/* Přístupnost: přeskočení navigace klávesnicí */}
      <a
        href="#obsah"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-white focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-ink focus:shadow-lift focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Přeskočit na obsah
      </a>

      <Navbar />

      <main id="obsah">
        <Hero />
        <Benefits />
        <Services />
        <Process />
        <Audience />
        <Testimonials />
        <Faq />
        <Contact />
      </main>

      <Footer />
      <Toaster />
    </>
  );
}

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/Logo";
import { useActiveSection } from "@/hooks/useActiveSection";
import { navItems } from "@/data/site";
import { cn } from "@/lib/utils";

const sectionIds = navItems.map((item) => item.id);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = useActiveSection(sectionIds);
  const reduceMotion = useReducedMotion();

  /* Stín a podklad navigace po odscrollování */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Zavření mobilního menu klávesou Escape */
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || menuOpen
          ? "border-b border-line bg-white/85 shadow-soft backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-4">
        <Logo />

        {/* Desktopová navigace */}
        <nav aria-label="Hlavní navigace" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  aria-current={activeId === item.id ? "true" : undefined}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    activeId === item.id
                      ? "bg-primary-soft font-semibold text-primary"
                      : "text-muted-foreground hover:bg-mist hover:text-ink",
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild className="hidden sm:inline-flex">
            <a href="#kontakt">
              Nezávazná konzultace
              <ArrowRight aria-hidden="true" />
            </a>
          </Button>

          {/* Přepínač mobilního menu */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobilni-menu"
            aria-label={menuOpen ? "Zavřít menu" : "Otevřít menu"}
            className="grid size-11 place-items-center rounded-full text-ink transition-colors hover:bg-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
          >
            {menuOpen ? (
              <X aria-hidden="true" className="size-5" />
            ) : (
              <Menu aria-hidden="true" className="size-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobilní menu */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            id="mobilni-menu"
            aria-label="Mobilní navigace"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-line bg-white md:hidden"
          >
            <ul className="container flex flex-col gap-1 py-4">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={activeId === item.id ? "true" : undefined}
                    className={cn(
                      "block rounded-xl px-4 py-3 text-base font-medium transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      activeId === item.id
                        ? "bg-primary-soft font-semibold text-primary"
                        : "text-ink hover:bg-mist",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="mt-2">
                <Button asChild size="lg" className="w-full">
                  <a href="#kontakt" onClick={() => setMenuOpen(false)}>
                    Nezávazná konzultace
                    <ArrowRight aria-hidden="true" />
                  </a>
                </Button>
              </li>
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

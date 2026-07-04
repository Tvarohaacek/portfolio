import { useEffect, useState } from "react";

/**
 * Sleduje, která sekce je právě ve viewportu, a vrací její id.
 * Používá IntersectionObserver – žádné scroll listenery, žádné zbytečné rendery.
 */
export function useActiveSection(sectionIds: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      {
        // Aktivní je sekce protínající pás kolem středu obrazovky
        rootMargin: "-40% 0px -55% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}

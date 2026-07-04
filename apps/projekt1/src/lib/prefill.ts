/**
 * Miniaturní event bus pro předvyplnění předmětu v kontaktním formuláři.
 * Karta služby vystřelí událost, formulář ji zachytí a nastaví hodnotu.
 * Zvyšuje konverzi – uživatel po kliknutí na službu nemusí nic vybírat.
 */
export const PREFILL_SUBJECT_EVENT = "najednicku:prefill-subject";

export function prefillSubject(subject: string) {
  window.dispatchEvent(
    new CustomEvent<string>(PREFILL_SUBJECT_EVENT, { detail: subject }),
  );
}

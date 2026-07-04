import { z } from "zod";

/** Volby předmětu ve formuláři – drženy na jednom místě. */
export const SUBJECT_OPTIONS = [
  "Matematika",
  "Český jazyk",
  "Přijímací zkoušky CERMAT",
  "Příprava na maturitu",
  "Jiný předmět",
] as const;

/** Volby ročníku ve formuláři. */
export const GRADE_OPTIONS = [
  "1.–5. třída ZŠ",
  "6.–7. třída ZŠ",
  "8. třída ZŠ",
  "9. třída ZŠ",
  "1.–2. ročník SŠ",
  "3. ročník SŠ",
  "4. ročník SŠ / maturant",
  "Jiné",
] as const;

const phoneRegex = /^$|^\+?[0-9][0-9 ]{7,15}$/;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Zadejte prosím jméno a příjmení.")
    .max(80, "Jméno je příliš dlouhé."),
  email: z
    .string()
    .trim()
    .min(1, "Zadejte prosím e-mail.")
    .email("Zadejte platnou e-mailovou adresu."),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, "Zadejte platné telefonní číslo (např. +420 777 123 456)."),
  subject: z.string().min(1, "Vyberte prosím předmět."),
  grade: z.string().min(1, "Vyberte prosím ročník."),
  message: z.string().trim().max(1000, "Zpráva může mít nejvýše 1000 znaků."),
  /** Honeypot proti spamu – lidé pole nevidí, boti ho vyplní. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactValues = z.infer<typeof contactSchema>;

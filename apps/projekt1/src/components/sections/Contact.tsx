import { useEffect, useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  CheckCircle2,
  Clock,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { site } from "@/data/site";
import {
  contactSchema,
  GRADE_OPTIONS,
  SUBJECT_OPTIONS,
  type ContactValues,
} from "@/lib/validation";
import { PREFILL_SUBJECT_EVENT } from "@/lib/prefill";

const guarantees = [
  "Odpověď do 24 hodin",
  "Úvodní konzultace zdarma",
  "Žádné smlouvy ani závazky",
];

export function Contact() {
  const formId = useId();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      grade: "",
      message: "",
      website: "",
    },
  });

  /* Předvyplnění předmětu po kliknutí na kartu služby */
  useEffect(() => {
    const onPrefill = (event: Event) => {
      const custom = event as CustomEvent<string>;
      if (typeof custom.detail === "string") {
        setValue("subject", custom.detail, { shouldValidate: true });
      }
    };
    window.addEventListener(PREFILL_SUBJECT_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_SUBJECT_EVENT, onPrefill);
  }, [setValue]);

  async function onSubmit(values: ContactValues) {
    /* Honeypot – tiché „úspěšné" odmítnutí botů */
    if (values.website) {
      reset();
      return;
    }

    /*
     * TODO: Napojení na backend.
     * Sem patří odeslání dat – např. vlastní API, Formspree nebo e-mailová
     * služba:
     *
     *   await fetch("https://formspree.io/f/VAS_ID", {
     *     method: "POST",
     *     headers: { "Content-Type": "application/json" },
     *     body: JSON.stringify(values),
     *   });
     *
     * Simulace síťového požadavku pro demo:
     */
    await new Promise((resolve) => setTimeout(resolve, 900));

    toast.success("Poptávka odeslána!", {
      description: "Děkujeme. Ozveme se vám nejpozději do 24 hodin.",
    });
    reset();
  }

  const errorId = (field: keyof ContactValues) => `${formId}-${field}-error`;

  return (
    <section
      id="kontakt"
      className="relative overflow-hidden bg-ink py-20 text-white md:py-28"
    >
      {/* Jemná mřížka sešitu na tmavém podkladu */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-paper-dark [mask-image:radial-gradient(ellipse_100%_80%_at_50%_0%,black_30%,transparent_80%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-24 top-16 size-72 rounded-full bg-primary/25 blur-3xl"
      />

      <div className="container relative grid gap-12 lg:grid-cols-[1fr,1.1fr] lg:gap-16">
        {/* Levý sloupec – motivace a kontakty */}
        <div>
          <SectionHeading
            align="left"
            dark
            eyebrow="Kontakt"
            title="Domluvme si nezávaznou konzultaci"
            lead="Napište nám, s čím student potřebuje pomoct. Do 24 hodin se ozveme a společně vymyslíme další krok – bez závazků."
          />

          <Reveal delay={0.1}>
            <ul className="mt-8 space-y-3">
              {guarantees.map((guarantee) => (
                <li
                  key={guarantee}
                  className="flex items-center gap-3 text-sm font-medium text-white/90"
                >
                  <CheckCircle2
                    aria-hidden="true"
                    className="size-5 shrink-0 text-honey"
                  />
                  {guarantee}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.18}>
            <address className="mt-10 space-y-4 border-t border-white/10 pt-8 text-sm not-italic">
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 text-white/80 transition-colors hover:text-honey focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey rounded"
              >
                <Mail aria-hidden="true" className="size-4 shrink-0" />
                {site.email}
              </a>
              <a
                href={site.phoneHref}
                className="flex items-center gap-3 text-white/80 transition-colors hover:text-honey focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey rounded"
              >
                <Phone aria-hidden="true" className="size-4 shrink-0" />
                {site.phone}
              </a>
              <p className="flex items-center gap-3 text-white/80">
                <Clock aria-hidden="true" className="size-4 shrink-0" />
                {site.availability}
              </p>
              <p className="flex items-center gap-3 text-white/80">
                <MapPin aria-hidden="true" className="size-4 shrink-0" />
                {site.area}
              </p>
            </address>
          </Reveal>
        </div>

        {/* Pravý sloupec – formulář */}
        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="rounded-3xl bg-white p-6 text-ink shadow-lift sm:p-8"
          >
            <h3 className="font-display text-xl font-bold tracking-tight">
              Poptávka doučování
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Vyplnění zabere dvě minuty. Pole s hvězdičkou jsou povinná.
            </p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {/* Jméno */}
              <div className="space-y-2">
                <Label htmlFor={`${formId}-name`}>Jméno a příjmení *</Label>
                <Input
                  id={`${formId}-name`}
                  autoComplete="name"
                  placeholder="Jana Nováková"
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={errors.name ? errorId("name") : undefined}
                  {...register("name")}
                />
                {errors.name ? (
                  <p
                    id={errorId("name")}
                    role="alert"
                    className="text-xs font-medium text-destructive"
                  >
                    {errors.name.message}
                  </p>
                ) : null}
              </div>

              {/* E-mail */}
              <div className="space-y-2">
                <Label htmlFor={`${formId}-email`}>E-mail *</Label>
                <Input
                  id={`${formId}-email`}
                  type="email"
                  autoComplete="email"
                  placeholder="jana@email.cz"
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={errors.email ? errorId("email") : undefined}
                  {...register("email")}
                />
                {errors.email ? (
                  <p
                    id={errorId("email")}
                    role="alert"
                    className="text-xs font-medium text-destructive"
                  >
                    {errors.email.message}
                  </p>
                ) : null}
              </div>

              {/* Předmět */}
              <div className="space-y-2">
                <Label htmlFor={`${formId}-subject`}>Předmět *</Label>
                <Select
                  id={`${formId}-subject`}
                  aria-invalid={errors.subject ? true : undefined}
                  aria-describedby={
                    errors.subject ? errorId("subject") : undefined
                  }
                  {...register("subject")}
                >
                  <option value="" disabled>
                    Vyberte předmět
                  </option>
                  {SUBJECT_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
                {errors.subject ? (
                  <p
                    id={errorId("subject")}
                    role="alert"
                    className="text-xs font-medium text-destructive"
                  >
                    {errors.subject.message}
                  </p>
                ) : null}
              </div>

              {/* Ročník */}
              <div className="space-y-2">
                <Label htmlFor={`${formId}-grade`}>Ročník studenta *</Label>
                <Select
                  id={`${formId}-grade`}
                  aria-invalid={errors.grade ? true : undefined}
                  aria-describedby={errors.grade ? errorId("grade") : undefined}
                  {...register("grade")}
                >
                  <option value="" disabled>
                    Vyberte ročník
                  </option>
                  {GRADE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
                {errors.grade ? (
                  <p
                    id={errorId("grade")}
                    role="alert"
                    className="text-xs font-medium text-destructive"
                  >
                    {errors.grade.message}
                  </p>
                ) : null}
              </div>

              {/* Telefon */}
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor={`${formId}-phone`}>Telefon (nepovinné)</Label>
                <Input
                  id={`${formId}-phone`}
                  type="tel"
                  autoComplete="tel"
                  placeholder="+420 777 123 456"
                  aria-invalid={errors.phone ? true : undefined}
                  aria-describedby={errors.phone ? errorId("phone") : undefined}
                  {...register("phone")}
                />
                {errors.phone ? (
                  <p
                    id={errorId("phone")}
                    role="alert"
                    className="text-xs font-medium text-destructive"
                  >
                    {errors.phone.message}
                  </p>
                ) : null}
              </div>

              {/* Zpráva */}
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor={`${formId}-message`}>Zpráva (nepovinné)</Label>
                <Textarea
                  id={`${formId}-message`}
                  placeholder="S čím potřebuje student pomoct? Jaké má cíle?"
                  aria-invalid={errors.message ? true : undefined}
                  aria-describedby={
                    errors.message ? errorId("message") : undefined
                  }
                  {...register("message")}
                />
                {errors.message ? (
                  <p
                    id={errorId("message")}
                    role="alert"
                    className="text-xs font-medium text-destructive"
                  >
                    {errors.message.message}
                  </p>
                ) : null}
              </div>

              {/* Honeypot – skryté pole proti spamu */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor={`${formId}-website`}>Web</label>
                <input
                  id={`${formId}-website`}
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  {...register("website")}
                />
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className="mt-7 w-full"
            >
              {isSubmitting ? (
                <>
                  <Loader2 aria-hidden="true" className="animate-spin" />
                  Odesílám…
                </>
              ) : (
                <>
                  Odeslat nezávaznou poptávku
                  <Send aria-hidden="true" />
                </>
              )}
            </Button>

            <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
              Odesláním souhlasíte se zpracováním osobních údajů pro účely
              vyřízení poptávky.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

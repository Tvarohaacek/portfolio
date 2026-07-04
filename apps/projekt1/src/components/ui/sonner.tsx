import { Toaster as SonnerToaster } from "sonner";

/** Notifikace úspěšného odeslání formuláře – sladěné s designem webu. */
export function Toaster() {
  return (
    <SonnerToaster
      position="top-center"
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast: "rounded-2xl border-line font-sans shadow-lift",
          title: "font-semibold",
          description: "text-muted-foreground",
        },
      }}
    />
  );
}

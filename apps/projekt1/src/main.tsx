import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

/* Self-hostované variabilní fonty (latin + latin-ext pro češtinu) */
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/instrument-sans";

import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

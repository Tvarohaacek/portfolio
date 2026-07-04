import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Zpoždění animace v sekundách – pro stagger efekt v mřížkách. */
  delay?: number;
  /** Počáteční posun v ose Y. */
  y?: number;
}

/**
 * Jemné odhalení obsahu při scrollu.
 * Respektuje prefers-reduced-motion – v tom případě se nic neanimuje.
 */
export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{ duration: 0.55, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}

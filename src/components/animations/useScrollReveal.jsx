import { useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Hook reutilizable para revelar elementos al hacer scroll.
 * Retorna { ref, isInView } — úsalo en motion.div con variants.
 * once: true = anima solo la primera vez que entra en viewport.
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px", ...options });
  return { ref, isInView };
}

// ─── Variants premium reutilizables ───────────────────────────────────────────

/** Fade + rise suave — ideal para headings y párrafos */
export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
  }
};

/** Stagger container — los children se animan en cascada */
export const staggerContainer = (staggerTime = 0.1, delayChildren = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: staggerTime, delayChildren }
  }
});

/** Fade + scale ligero — ideal para cards */
export const cardReveal = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

/** Deslizamiento desde izquierda */
export const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
  }
};

/** Deslizamiento desde derecha */
export const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
  }
};
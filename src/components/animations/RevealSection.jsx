import React, { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";

const RevealSection = memo(function RevealSection({
  children,
  className = "",
  delay = 0,
  amount = 0.15,
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <section className={className}>{children}</section>;
  }

  return (
    <motion.section
      className={className}
      // Only animate opacity + translateY — both run on the compositor thread (S-Tier).
      // Removed filter:blur and scale to avoid expensive GPU repaints on mobile.
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.section>
  );
});

export default RevealSection;
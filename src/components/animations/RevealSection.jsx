import React, { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";

const RevealSection = memo(function RevealSection({
  children,
  className = "",
  delay = 0,
  amount = 0.2,
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <section className={className}>{children}</section>;
  }

  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: 48, scale: 0.98, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
});

export default RevealSection;
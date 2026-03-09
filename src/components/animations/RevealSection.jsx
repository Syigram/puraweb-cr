import React, { memo, useRef, useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * RevealSection — CSS-driven reveal with blur effect.
 * Uses IntersectionObserver + CSS transitions instead of Framer Motion
 * to avoid per-frame JS calculations for filter/blur which causes jank.
 * CSS transitions for opacity/transform/filter are GPU-composited and much smoother.
 */
const RevealSection = memo(function RevealSection({
  children,
  className = "",
  delay = 0,
  amount = 0.2,
}) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: amount }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [amount, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return <section className={className}>{children}</section>;
  }

  return (
    <section
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0) scale(1)" : "translateY(48px) scale(0.98)",
        filter: isVisible ? "blur(0px)" : "blur(10px)",
        transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s, filter 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        willChange: isVisible ? "auto" : "opacity, transform, filter",
      }}
    >
      {children}
    </section>
  );
});

export default RevealSection;
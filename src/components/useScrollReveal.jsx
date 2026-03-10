import { useEffect, useRef, useState } from "react";

/**
 * Hook ligero para detectar cuando un elemento entra al viewport.
 * Usa IntersectionObserver (no CPU/GPU intensivo).
 * @param {number} threshold - % del elemento visible para disparar (0-1)
 * @param {string} rootMargin - margen para adelantar/retrasar el trigger
 */
export function useScrollReveal(threshold = 0.15, rootMargin = "0px 0px -60px 0px") {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Si el elemento ya está en viewport al montar (ej: primera sección), mostrar directo
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Solo trigger una vez
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isVisible };
}
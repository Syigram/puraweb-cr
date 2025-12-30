import React, { useState, useRef, useEffect, memo } from "react";

const LazySection = memo(function LazySection({ 
  children, 
  className = "",
  rootMargin = "100px",
  fallback = null,
  minHeight = "400px"
}) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { 
        rootMargin,
        threshold: 0.01 
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={sectionRef} className={className}>
      {isVisible ? children : (
        fallback || (
          <div 
            style={{ minHeight }}
            className="flex items-center justify-center bg-gray-50"
            aria-hidden="true"
          >
            <div className="w-8 h-8 border-2 border-blue-900 border-t-transparent rounded-full animate-spin" />
          </div>
        )
      )}
    </div>
  );
});

export default LazySection;
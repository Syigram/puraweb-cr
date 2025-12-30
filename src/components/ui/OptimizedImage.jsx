import React, { useState, useRef, useEffect, memo } from "react";

const OptimizedImage = memo(function OptimizedImage({ 
  src, 
  alt, 
  className = "", 
  width,
  height,
  priority = false,
  placeholder = "blur"
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef(null);

  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        rootMargin: "200px",
        threshold: 0.01 
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Optimize image URL for external sources
  const getOptimizedSrc = (originalSrc) => {
    if (!originalSrc) return "";
    
    // Unsplash optimization
    if (originalSrc.includes("unsplash.com")) {
      const baseUrl = originalSrc.split("?")[0];
      return `${baseUrl}?w=${width || 800}&q=75&fm=webp&auto=format&fit=crop`;
    }
    
    // Supabase/other sources - return as is
    return originalSrc;
  };

  const optimizedSrc = getOptimizedSrc(src);

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ 
        aspectRatio: width && height ? `${width}/${height}` : undefined,
        backgroundColor: '#f3f4f6'
      }}
    >
      {/* Placeholder blur */}
      {placeholder === "blur" && !isLoaded && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse"
          aria-hidden="true"
        />
      )}
      
      {isInView && (
        <img
          src={optimizedSrc}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          fetchpriority={priority ? "high" : "auto"}
          onLoad={() => setIsLoaded(true)}
          className={`
            w-full h-full object-cover transition-opacity duration-300
            ${isLoaded ? "opacity-100" : "opacity-0"}
          `}
          style={{ 
            contentVisibility: priority ? "visible" : "auto"
          }}
        />
      )}
    </div>
  );
});

export default OptimizedImage;
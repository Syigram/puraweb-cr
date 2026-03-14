import React from "react";

// Variante 3: Cluster de pines secundarios orbitando un pin principal
export default function MapPinClusterIcon() {
  return (
    <div className="relative w-60 h-60 flex items-center justify-center select-none">
      <style>{`
        @keyframes orbitPin {
          from { transform: rotate(0deg) translateX(58px) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(58px) rotate(-360deg); }
        }
        @keyframes orbitPin2 {
          from { transform: rotate(120deg) translateX(58px) rotate(-120deg); }
          to   { transform: rotate(480deg) translateX(58px) rotate(-480deg); }
        }
        @keyframes orbitPin3 {
          from { transform: rotate(240deg) translateX(58px) rotate(-240deg); }
          to   { transform: rotate(600deg) translateX(58px) rotate(-600deg); }
        }
        @keyframes mainPinPulse {
          0%,100% { transform: scale(1); }
          50%     { transform: scale(1.05); }
        }
        @keyframes linePulse {
          0%,100% { opacity: 0.15; }
          50%     { opacity: 0.5; }
        }
        .orbit-pin-1 { transform-origin: 100px 100px; animation: orbitPin  6s linear infinite; }
        .orbit-pin-2 { transform-origin: 100px 100px; animation: orbitPin2 6s linear infinite; }
        .orbit-pin-3 { transform-origin: 100px 100px; animation: orbitPin3 6s linear infinite; }
        .main-pulse  { transform-origin: 100px 90px;  animation: mainPinPulse 2.5s ease-in-out infinite; }
        .line-pulse  { animation: linePulse 2s ease-in-out infinite; }
        @keyframes rippleCluster { 0%{r:18;opacity:0.5} 100%{r:72;opacity:0} }
        .ring-c1 { animation: rippleCluster 3s ease-out 0s infinite; }
        .ring-c2 { animation: rippleCluster 3s ease-out 1s infinite; }
      `}</style>
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <radialGradient id="clusterBg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#EFF6FF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#EFF6FF" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background glow */}
        <circle cx="100" cy="100" r="80" fill="url(#clusterBg)" />

        {/* Orbit path */}
        <circle cx="100" cy="100" r="58" fill="none" stroke="#93C5FD" strokeWidth="1" strokeDasharray="5 4" opacity="0.4" />

        {/* Ripple rings */}
        <circle cx="100" cy="100" r="18" fill="none" stroke="#002B7F" strokeWidth="1.5" opacity="0" className="ring-c1" />
        <circle cx="100" cy="100" r="18" fill="none" stroke="#CE1126" strokeWidth="1"   opacity="0" className="ring-c2" />

        {/* Orbiting mini-pins */}
        <g className="orbit-pin-1">
          <path d="M100,62 C95,62 90,67 90,73 C90,80 100,88 100,88 C100,88 110,80 110,73 C110,67 105,62 100,62 Z"
            fill="#1D4ED8" stroke="#1E3A8A" strokeWidth="1.2" />
          <circle cx="100" cy="73" r="5" fill="white" opacity="0.9" />
        </g>
        <g className="orbit-pin-2">
          <path d="M100,62 C95,62 90,67 90,73 C90,80 100,88 100,88 C100,88 110,80 110,73 C110,67 105,62 100,62 Z"
            fill="#059669" stroke="#065F46" strokeWidth="1.2" />
          <circle cx="100" cy="73" r="5" fill="white" opacity="0.9" />
        </g>
        <g className="orbit-pin-3">
          <path d="M100,62 C95,62 90,67 90,73 C90,80 100,88 100,88 C100,88 110,80 110,73 C110,67 105,62 100,62 Z"
            fill="#D97706" stroke="#92400E" strokeWidth="1.2" />
          <circle cx="100" cy="73" r="5" fill="white" opacity="0.9" />
        </g>

        {/* Main pin */}
        <g className="main-pulse">
          <path d="M100,55 C80,55 64,71 64,90 C64,113 100,148 100,148 C100,148 136,113 136,90 C136,71 120,55 100,55 Z"
            fill="#CE1126" stroke="#991B1B" strokeWidth="2.5" />
          <circle cx="100" cy="89" r="20" fill="white" opacity="0.95" />
          <rect x="82" y="81" width="36" height="5" rx="1.5" fill="#002B7F" />
          <rect x="82" y="89" width="36" height="5" rx="1.5" fill="#CE1126" />
          <rect x="82" y="97" width="36" height="5" rx="1.5" fill="#002B7F" />
          <ellipse cx="100" cy="151" rx="16" ry="4.5" fill="#002B7F" opacity="0.12" />
        </g>
      </svg>
    </div>
  );
}
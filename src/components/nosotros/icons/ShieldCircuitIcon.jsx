import React from "react";

export default function ShieldCircuitIcon() {
  return (
    <div className="relative w-60 h-60 flex items-center justify-center select-none">
      <style>{`
        @keyframes circuitPulse { 0%{stroke-dashoffset:200} 100%{stroke-dashoffset:0} }
        @keyframes shieldGlow   { 0%,100%{filter:drop-shadow(0 0 4px #002B7F66)} 50%{filter:drop-shadow(0 0 14px #002B7F99)} }
        @keyframes dotBlink { 0%,100%{opacity:1;r:3} 50%{opacity:0.3;r:2} }
        .shield-glow { animation: shieldGlow 3s ease-in-out infinite; }
        .circuit-line-1 { stroke-dasharray:200; animation: circuitPulse 3s linear 0s infinite; }
        .circuit-line-2 { stroke-dasharray:200; animation: circuitPulse 3s linear 0.5s infinite; }
        .circuit-line-3 { stroke-dasharray:200; animation: circuitPulse 3s linear 1s infinite; }
        .circuit-line-4 { stroke-dasharray:200; animation: circuitPulse 3s linear 1.5s infinite; }
        .dot-1 { animation: dotBlink 2s ease-in-out 0s infinite; }
        .dot-2 { animation: dotBlink 2s ease-in-out 0.4s infinite; }
        .dot-3 { animation: dotBlink 2s ease-in-out 0.8s infinite; }
        .dot-4 { animation: dotBlink 2s ease-in-out 1.2s infinite; }
        .dot-5 { animation: dotBlink 2s ease-in-out 1.6s infinite; }
      `}</style>
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient id="shieldFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#EFF6FF" />
            <stop offset="100%" stopColor="#DBEAFE" />
          </linearGradient>
          <clipPath id="shieldClip">
            <path d="M100,15 L175,45 L175,110 Q175,160 100,185 Q25,160 25,110 L25,45 Z" />
          </clipPath>
        </defs>

        {/* Shield */}
        <g className="shield-glow">
          <path d="M100,15 L175,45 L175,110 Q175,160 100,185 Q25,160 25,110 L25,45 Z"
            fill="url(#shieldFill)" stroke="#002B7F" strokeWidth="3" />
        </g>

        {/* Circuit board traces inside shield */}
        <g clipPath="url(#shieldClip)">
          {/* Horizontal traces */}
          <polyline points="40,80 70,80 70,65 100,65 100,80 130,80 130,65 160,65"
            fill="none" stroke="#1D4ED8" strokeWidth="2" className="circuit-line-1" />
          <polyline points="40,110 60,110 60,125 90,125 90,110 110,110 110,125 140,125 140,110 160,110"
            fill="none" stroke="#1D4ED8" strokeWidth="2" className="circuit-line-2" />
          <polyline points="55,140 80,140 80,155 100,155 120,155 120,140 145,140"
            fill="none" stroke="#3B82F6" strokeWidth="1.5" className="circuit-line-3" />
          {/* Vertical traces */}
          <polyline points="100,65 100,50 85,50 85,38"
            fill="none" stroke="#CE1126" strokeWidth="2" className="circuit-line-4" />
        </g>

        {/* Circuit nodes */}
        <circle cx="70"  cy="80"  r="4" fill="#002B7F" className="dot-1" />
        <circle cx="100" cy="80"  r="4" fill="#002B7F" className="dot-2" />
        <circle cx="130" cy="80"  r="4" fill="#002B7F" className="dot-3" />
        <circle cx="90"  cy="125" r="4" fill="#1D4ED8" className="dot-4" />
        <circle cx="110" cy="125" r="4" fill="#1D4ED8" className="dot-5" />

        {/* Center chip */}
        <rect x="80" y="95" width="40" height="28" rx="4"
          fill="#0F172A" stroke="#3B82F6" strokeWidth="1.5" />
        <text x="100" y="113" textAnchor="middle" fontSize="9"
          fontFamily="monospace" fill="#60A5FA">CPU</text>

        {/* Top of shield check mark */}
        <path d="M85,38 L95,48 L115,28" fill="none" stroke="#CE1126" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
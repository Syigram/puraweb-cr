import React from "react";

// Costa Rica map pin + network lines — local identity with global reach
export default function MapPinNetworkIcon() {
  return (
    <div className="relative w-60 h-60 flex items-center justify-center select-none">
      <style>{`
        @keyframes pingRipple {
          0%   { r: 12; opacity: 0.8; }
          100% { r: 55; opacity: 0; }
        }
        @keyframes pinBounce {
          0%,100% { transform: translateY(0); }
          40%     { transform: translateY(-8px); }
        }
        @keyframes dotAppear { 0%{opacity:0;r:0} 30%{opacity:1;r:4} 80%{opacity:1} 100%{opacity:0;r:4} }
        .ripple-1 { animation: pingRipple 2.5s ease-out 0.0s infinite; }
        .ripple-2 { animation: pingRipple 2.5s ease-out 0.8s infinite; }
        .ripple-3 { animation: pingRipple 2.5s ease-out 1.6s infinite; }
        .pin-bounce { animation: pinBounce 2s ease-in-out infinite; transform-origin: 100px 140px; }
        .dot-a { animation: dotAppear 3s ease-in-out 0s infinite; }
        .dot-b { animation: dotAppear 3s ease-in-out 0.6s infinite; }
        .dot-c { animation: dotAppear 3s ease-in-out 1.2s infinite; }
        .dot-d { animation: dotAppear 3s ease-in-out 1.8s infinite; }
      `}</style>
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <radialGradient id="groundGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#DBEAFE" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#DBEAFE" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ground glow */}
        <ellipse cx="100" cy="155" rx="60" ry="20" fill="url(#groundGrad)" />

        {/* Ripples */}
        <circle cx="100" cy="152" r="12" fill="none" stroke="#002B7F" strokeWidth="1.5" opacity="0" className="ripple-1" />
        <circle cx="100" cy="152" r="12" fill="none" stroke="#002B7F" strokeWidth="1"   opacity="0" className="ripple-2" />
        <circle cx="100" cy="152" r="12" fill="none" stroke="#CE1126" strokeWidth="1"   opacity="0" className="ripple-3" />

        {/* Satellite dots */}
        <circle cx="42"  cy="65"  r="4" fill="#002B7F" className="dot-a" />
        <circle cx="158" cy="72"  r="4" fill="#CE1126" className="dot-b" />
        <circle cx="165" cy="125" r="4" fill="#1D4ED8" className="dot-c" />
        <circle cx="35"  cy="118" r="4" fill="#002B7F" className="dot-d" />

        {/* Network lines from dots to pin */}
        <line x1="42"  y1="65"  x2="100" y2="100" stroke="#93C5FD" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
        <line x1="158" y1="72"  x2="100" y2="100" stroke="#FCA5A5" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
        <line x1="165" y1="125" x2="100" y2="125" stroke="#93C5FD" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />
        <line x1="35"  y1="118" x2="100" y2="125" stroke="#93C5FD" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />

        {/* Map pin */}
        <g className="pin-bounce">
          {/* Pin body */}
          <path d="M100,55 C78,55 62,72 62,93 C62,118 100,152 100,152 C100,152 138,118 138,93 C138,72 122,55 100,55 Z"
            fill="#CE1126" stroke="#991B1B" strokeWidth="2" />
          {/* Inner circle */}
          <circle cx="100" cy="92" r="18" fill="white" opacity="0.95" />
          {/* CR flag stripe */}
          <rect x="82" y="83" width="36" height="5" rx="1" fill="#002B7F" />
          <rect x="82" y="91" width="36" height="5" rx="1" fill="#CE1126" />
          <rect x="82" y="99" width="36" height="5" rx="1" fill="#002B7F" />
          {/* Drop shadow */}
          <ellipse cx="100" cy="155" rx="18" ry="5" fill="#002B7F" opacity="0.12" />
        </g>
      </svg>
    </div>
  );
}
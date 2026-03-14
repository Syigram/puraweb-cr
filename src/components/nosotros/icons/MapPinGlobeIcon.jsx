import React from "react";

// Variante 2: Pin sobre un mini-globo terráqueo giratorio
export default function MapPinGlobeIcon() {
  return (
    <div className="relative w-60 h-60 flex items-center justify-center select-none">
      <style>{`
        @keyframes globeSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes globeSpinR {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @keyframes pinFloat {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(-6px); }
        }
        @keyframes connPulse {
          0%,100% { opacity: 0.2; }
          50%     { opacity: 0.8; }
        }
        .globe-ring1 { transform-origin: 100px 138px; animation: globeSpin  8s linear infinite; }
        .globe-ring2 { transform-origin: 100px 138px; animation: globeSpinR 12s linear infinite; }
        .globe-ring3 { transform-origin: 100px 138px; animation: globeSpin  18s linear infinite; }
        .pin-float   { animation: pinFloat 2.2s ease-in-out infinite; transform-origin: 100px 80px; }
        .conn-pulse  { animation: connPulse 2s ease-in-out infinite; }
      `}</style>
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <radialGradient id="globeGrad" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </radialGradient>
          <clipPath id="globeClip">
            <circle cx="100" cy="138" r="42" />
          </clipPath>
        </defs>

        {/* Globe body */}
        <circle cx="100" cy="138" r="42" fill="url(#globeGrad)" />

        {/* Latitude lines */}
        <ellipse cx="100" cy="138" rx="42" ry="14" fill="none" stroke="white" strokeWidth="0.8" opacity="0.3" />
        <ellipse cx="100" cy="124" rx="38" ry="10" fill="none" stroke="white" strokeWidth="0.8" opacity="0.2" />
        <ellipse cx="100" cy="152" rx="38" ry="10" fill="none" stroke="white" strokeWidth="0.8" opacity="0.2" />

        {/* Rotating meridian rings */}
        <g className="globe-ring1" clipPath="url(#globeClip)">
          <ellipse cx="100" cy="138" rx="42" ry="18" fill="none" stroke="white" strokeWidth="1" strokeDasharray="3 4" opacity="0.35" />
        </g>
        <g className="globe-ring2" clipPath="url(#globeClip)">
          <ellipse cx="100" cy="138" rx="42" ry="22" fill="none" stroke="#BFDBFE" strokeWidth="0.8" strokeDasharray="2 5" opacity="0.3" />
        </g>
        <g className="globe-ring3" clipPath="url(#globeClip)">
          <ellipse cx="100" cy="138" rx="28" ry="42" fill="none" stroke="white" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.25" />
        </g>

        {/* Continents (simplified blobs) */}
        <g clipPath="url(#globeClip)" opacity="0.55">
          <ellipse cx="88"  cy="130" rx="14" ry="9"  fill="#34D399" />
          <ellipse cx="112" cy="142" rx="10" ry="7"  fill="#34D399" />
          <ellipse cx="80"  cy="148" rx="8"  ry="5"  fill="#34D399" />
          <ellipse cx="118" cy="128" rx="7"  ry="5"  fill="#34D399" />
        </g>

        {/* Globe border */}
        <circle cx="100" cy="138" r="42" fill="none" stroke="#1E3A8A" strokeWidth="1.5" />

        {/* Connection line from pin to globe */}
        <line x1="100" y1="92" x2="100" y2="96" stroke="#CE1126" strokeWidth="2"
          strokeDasharray="3 2" className="conn-pulse" />

        {/* Map pin */}
        <g className="pin-float">
          <path d="M100,38 C84,38 72,50 72,65 C72,84 100,98 100,98 C100,98 128,84 128,65 C128,50 116,38 100,38 Z"
            fill="#CE1126" stroke="#991B1B" strokeWidth="2" />
          <circle cx="100" cy="64" r="15" fill="white" opacity="0.95" />
          <rect x="85" y="57" width="30" height="4" rx="1" fill="#002B7F" />
          <rect x="85" y="63" width="30" height="4" rx="1" fill="#CE1126" />
          <rect x="85" y="69" width="30" height="4" rx="1" fill="#002B7F" />
          <ellipse cx="100" cy="100" rx="12" ry="3.5" fill="#002B7F" opacity="0.15" />
        </g>
      </svg>
    </div>
  );
}
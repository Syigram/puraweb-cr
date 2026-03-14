import React from "react";

// Variante 1: Radar sweep giratorio desde el pin
export default function MapPinRadarIcon() {
  return (
    <div className="relative w-60 h-60 flex items-center justify-center select-none">
      <style>{`
        @keyframes radarSweep {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes radarPing {
          0%   { r: 10; opacity: 0.6; }
          100% { r: 70; opacity: 0; }
        }
        @keyframes pinBounceR {
          0%,100% { transform: translateY(0); }
          40%     { transform: translateY(-7px); }
        }
        @keyframes blipOn {
          0%,100% { opacity: 0; r: 2; }
          40%,60% { opacity: 1; r: 5; }
        }
        .radar-spin  { transform-origin: 100px 100px; animation: radarSweep 3s linear infinite; }
        .radar-ring1 { animation: radarPing 3s ease-out 0.0s infinite; }
        .radar-ring2 { animation: radarPing 3s ease-out 1.0s infinite; }
        .radar-ring3 { animation: radarPing 3s ease-out 2.0s infinite; }
        .pin-r       { animation: pinBounceR 2s ease-in-out infinite; transform-origin: 100px 140px; }
        .blip-1 { animation: blipOn 3s ease-in-out 0.5s infinite; }
        .blip-2 { animation: blipOn 3s ease-in-out 1.2s infinite; }
        .blip-3 { animation: blipOn 3s ease-in-out 2.0s infinite; }
        .blip-4 { animation: blipOn 3s ease-in-out 0.9s infinite; }
      `}</style>
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <radialGradient id="radarBg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#002B7F" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#002B7F" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="sweepGrad" cx="0%" cy="50%" r="100%">
            <stop offset="0%" stopColor="#002B7F" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#002B7F" stopOpacity="0" />
          </radialGradient>
          <clipPath id="radarClip">
            <circle cx="100" cy="100" r="72" />
          </clipPath>
        </defs>

        {/* Radar background */}
        <circle cx="100" cy="100" r="72" fill="url(#radarBg)" stroke="#002B7F" strokeWidth="0.8" opacity="0.2" />

        {/* Grid rings */}
        <circle cx="100" cy="100" r="24" fill="none" stroke="#002B7F" strokeWidth="0.6" opacity="0.15" />
        <circle cx="100" cy="100" r="48" fill="none" stroke="#002B7F" strokeWidth="0.6" opacity="0.15" />
        <circle cx="100" cy="100" r="72" fill="none" stroke="#002B7F" strokeWidth="0.6" opacity="0.15" />

        {/* Cross lines */}
        <line x1="100" y1="28" x2="100" y2="172" stroke="#002B7F" strokeWidth="0.6" opacity="0.12" />
        <line x1="28"  y1="100" x2="172" y2="100" stroke="#002B7F" strokeWidth="0.6" opacity="0.12" />

        {/* Ping rings */}
        <circle cx="100" cy="100" r="10" fill="none" stroke="#CE1126" strokeWidth="1.5" opacity="0" className="radar-ring1" />
        <circle cx="100" cy="100" r="10" fill="none" stroke="#CE1126" strokeWidth="1"   opacity="0" className="radar-ring2" />
        <circle cx="100" cy="100" r="10" fill="none" stroke="#CE1126" strokeWidth="1"   opacity="0" className="radar-ring3" />

        {/* Rotating sweep */}
        <g className="radar-spin" clipPath="url(#radarClip)">
          <path d="M100,100 L172,100 A72,72 0 0,1 100,28 Z"
            fill="url(#sweepGrad)" opacity="0.5" />
          <line x1="100" y1="100" x2="172" y2="100" stroke="#002B7F" strokeWidth="1.5" opacity="0.6" />
        </g>

        {/* Blips */}
        <circle cx="135" cy="68"  r="3" fill="#CE1126" className="blip-1" />
        <circle cx="58"  cy="82"  r="3" fill="#002B7F" className="blip-2" />
        <circle cx="148" cy="122" r="3" fill="#CE1126" className="blip-3" />
        <circle cx="72"  cy="135" r="3" fill="#1D4ED8" className="blip-4" />

        {/* Map pin */}
        <g className="pin-r">
          <path d="M100,62 C82,62 68,76 68,94 C68,116 100,148 100,148 C100,148 132,116 132,94 C132,76 118,62 100,62 Z"
            fill="#CE1126" stroke="#991B1B" strokeWidth="2" />
          <circle cx="100" cy="93" r="16" fill="white" opacity="0.95" />
          <rect x="84" y="85" width="32" height="4" rx="1" fill="#002B7F" />
          <rect x="84" y="92" width="32" height="4" rx="1" fill="#CE1126" />
          <rect x="84" y="99" width="32" height="4" rx="1" fill="#002B7F" />
          <ellipse cx="100" cy="151" rx="14" ry="4" fill="#002B7F" opacity="0.12" />
        </g>
      </svg>
    </div>
  );
}
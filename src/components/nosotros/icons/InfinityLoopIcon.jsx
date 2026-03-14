import React from "react";

// ∞ loop — continuous improvement & commitment
export default function InfinityLoopIcon() {
  return (
    <div className="relative w-60 h-60 flex items-center justify-center select-none">
      <style>{`
        @keyframes drawInfinity {
          from { stroke-dashoffset: 600; }
          to   { stroke-dashoffset: 0;   }
        }
        @keyframes dotTravel   {
          0%   { offset-distance: 0%;   opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        @keyframes labelPop { 0%,100%{transform:scale(1)} 50%{transform:scale(1.06)} }
        .inf-stroke  { stroke-dasharray: 600; animation: drawInfinity 4s ease-in-out infinite alternate; }
        .dot-travel-1 { motion-path: path("M100,100 C60,100 20,60 60,100 C100,140 140,100 180,100 C140,100 100,60 60,100"); offset-path: path("M100,100 C60,60 20,100 60,100 C100,100 140,140 180,100 C140,60 100,100 60,100 Z"); animation: dotTravel 3s linear 0s infinite; }
        .label-pop { animation: labelPop 2s ease-in-out infinite; }
        @keyframes wordFloat-1 { 0%,100%{opacity:0.3;transform:translateY(0)} 50%{opacity:1;transform:translateY(-6px)} }
        @keyframes wordFloat-2 { 0%,100%{opacity:0.3;transform:translateY(0)} 50%{opacity:1;transform:translateY(-6px)} }
        @keyframes wordFloat-3 { 0%,100%{opacity:0.3;transform:translateY(0)} 50%{opacity:1;transform:translateY(-6px)} }
        .word-1 { animation: wordFloat-1 2s ease-in-out 0.0s infinite; transform-origin: 54px 140px; }
        .word-2 { animation: wordFloat-2 2s ease-in-out 0.7s infinite; transform-origin: 100px 148px; }
        .word-3 { animation: wordFloat-3 2s ease-in-out 1.4s infinite; transform-origin: 148px 140px; }

        @keyframes rotatePath { from{stroke-dashoffset:600} to{stroke-dashoffset:-600} }
        .inf-glow { stroke-dasharray:600; animation: rotatePath 6s linear infinite; }
      `}</style>
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient id="infGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#002B7F" />
            <stop offset="50%"  stopColor="#CE1126" />
            <stop offset="100%" stopColor="#002B7F" />
          </linearGradient>
        </defs>

        {/* Background soft circles */}
        <circle cx="68"  cy="100" r="42" fill="none" stroke="#EFF6FF" strokeWidth="8" />
        <circle cx="132" cy="100" r="42" fill="none" stroke="#FFF1F2" strokeWidth="8" />

        {/* Infinity symbol — main stroke */}
        <path
          d="M100,100 C80,68 32,68 32,100 C32,132 80,132 100,100 C120,68 168,68 168,100 C168,132 120,132 100,100 Z"
          fill="none" stroke="url(#infGrad)" strokeWidth="8" strokeLinecap="round"
          className="inf-stroke" />

        {/* Animated glow trace */}
        <path
          d="M100,100 C80,68 32,68 32,100 C32,132 80,132 100,100 C120,68 168,68 168,100 C168,132 120,132 100,100 Z"
          fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.6"
          className="inf-glow" />

        {/* Moving dot (SVG animateMotion) */}
        <circle r="6" fill="#CE1126">
          <animateMotion
            path="M100,100 C80,68 32,68 32,100 C32,132 80,132 100,100 C120,68 168,68 168,100 C168,132 120,132 100,100 Z"
            dur="3s" repeatCount="indefinite" />
        </circle>

        {/* Center label */}
        <g className="label-pop">
          <rect x="80" y="92" width="40" height="16" rx="8" fill="white" stroke="#002B7F" strokeWidth="1.5" />
          <text x="100" y="103" textAnchor="middle" fontSize="8"
            fontFamily="sans-serif" fontWeight="bold" fill="#002B7F">∞ mejora</text>
        </g>

        {/* Floating words */}
        <g className="word-1">
          <text x="54" y="148" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fill="#002B7F">Calidad</text>
        </g>
        <g className="word-2">
          <text x="100" y="156" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fill="#CE1126">Confianza</text>
        </g>
        <g className="word-3">
          <text x="148" y="148" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fill="#002B7F">Innovación</text>
        </g>
      </svg>
    </div>
  );
}
import React from "react";

export default function WebHandsIcon() {
  return (
    <div className="relative w-60 h-60 flex items-center justify-center select-none">
      <style>{`
        @keyframes handPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.04)} }
        @keyframes waveOrbit { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes tagFade   { 0%,100%{opacity:0.5} 50%{opacity:1} }
        .hand-anim { animation: handPulse 2.5s ease-in-out infinite; transform-origin: 100px 130px; }
        .orbit-ring { animation: waveOrbit 12s linear infinite; transform-origin: 100px 100px; }
        .tag-anim-1 { animation: tagFade 2s ease-in-out 0s infinite; }
        .tag-anim-2 { animation: tagFade 2s ease-in-out 0.5s infinite; }
        .tag-anim-3 { animation: tagFade 2s ease-in-out 1s infinite; }
      `}</style>
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <radialGradient id="handsGlow" cx="50%" cy="70%" r="40%">
            <stop offset="0%" stopColor="#DBEAFE" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#DBEAFE" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background glow */}
        <ellipse cx="100" cy="140" rx="70" ry="40" fill="url(#handsGlow)" />

        {/* Orbit ring with tags */}
        <g className="orbit-ring">
          <ellipse cx="100" cy="75" rx="60" ry="20" fill="none" stroke="#BFDBFE" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="160" cy="75" r="5" fill="#002B7F" opacity="0.6" />
          <circle cx="40"  cy="75" r="5" fill="#CE1126" opacity="0.6" />
        </g>

        {/* HTML/CSS tags floating */}
        <text x="32" y="48"  fontSize="11" fontFamily="monospace" fill="#002B7F" className="tag-anim-1">{"<W>"}</text>
        <text x="140" y="48" fontSize="11" fontFamily="monospace" fill="#CE1126" className="tag-anim-2">{"</W>"}</text>
        <text x="82" y="32"  fontSize="11" fontFamily="monospace" fill="#1D4ED8" className="tag-anim-3">{"{ }"}</text>

        {/* Two hands forming W shape */}
        <g className="hand-anim">
          {/* Left hand */}
          <g transform="translate(28, 90)">
            {/* Palm */}
            <rect x="0" y="30" width="40" height="35" rx="8" fill="#FCD9A0" stroke="#D97706" strokeWidth="1.5" />
            {/* Fingers - ring, middle, index */}
            <rect x="5"  y="5"  width="10" height="30" rx="5" fill="#FCD9A0" stroke="#D97706" strokeWidth="1.5" />
            <rect x="17" y="0"  width="10" height="35" rx="5" fill="#FCD9A0" stroke="#D97706" strokeWidth="1.5" />
            <rect x="29" y="5"  width="10" height="30" rx="5" fill="#FCD9A0" stroke="#D97706" strokeWidth="1.5" />
            {/* Thumb */}
            <rect x="-8" y="33" width="14" height="10" rx="5" fill="#FCD9A0" stroke="#D97706" strokeWidth="1.5" transform="rotate(-20 0 38)" />
          </g>

          {/* Right hand (mirrored) */}
          <g transform="translate(172, 90) scale(-1,1)">
            <rect x="0" y="30" width="40" height="35" rx="8" fill="#FCD9A0" stroke="#D97706" strokeWidth="1.5" />
            <rect x="5"  y="5"  width="10" height="30" rx="5" fill="#FCD9A0" stroke="#D97706" strokeWidth="1.5" />
            <rect x="17" y="0"  width="10" height="35" rx="5" fill="#FCD9A0" stroke="#D97706" strokeWidth="1.5" />
            <rect x="29" y="5"  width="10" height="30" rx="5" fill="#FCD9A0" stroke="#D97706" strokeWidth="1.5" />
            <rect x="-8" y="33" width="14" height="10" rx="5" fill="#FCD9A0" stroke="#D97706" strokeWidth="1.5" transform="rotate(-20 0 38)" />
          </g>
        </g>

        {/* W letter formed by hands */}
        <text x="100" y="185" textAnchor="middle" fontSize="28" fontFamily="'Georgia', serif"
          fontWeight="bold" fill="#002B7F" opacity="0.15">Web</text>
      </svg>
    </div>
  );
}
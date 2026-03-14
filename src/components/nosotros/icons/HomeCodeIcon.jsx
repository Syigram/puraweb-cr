import React from "react";

export default function HomeCodeIcon() {
  return (
    <div className="relative w-60 h-60 flex items-center justify-center select-none">
      <style>{`
        @keyframes typeCursor { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes slideCode { 0%{transform:translateY(0)} 100%{transform:translateY(-80px)} }
        @keyframes roofGlow  { 0%,100%{opacity:0.7} 50%{opacity:1} }
        .cursor-blink { animation: typeCursor 1s step-end infinite; }
        .code-scroll  { animation: slideCode 5s linear infinite; }
        .roof-glow    { animation: roofGlow 2.5s ease-in-out infinite; }
      `}</style>
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <clipPath id="houseClip">
            <polygon points="100,30 175,90 175,180 25,180 25,90" />
          </clipPath>
          <linearGradient id="wallGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#EEF2FF" />
            <stop offset="100%" stopColor="#C7D2FE" />
          </linearGradient>
        </defs>

        {/* House body */}
        <polygon points="100,30 175,90 175,180 25,180 25,90"
          fill="url(#wallGrad)" stroke="#002B7F" strokeWidth="2.5" />

        {/* Roof highlight */}
        <polygon points="100,30 175,90 25,90"
          fill="#002B7F" className="roof-glow" />

        {/* Window / code area */}
        <rect x="42" y="100" width="116" height="68" rx="5"
          fill="#0F172A" stroke="#334155" strokeWidth="1.5" />

        {/* Scrolling code lines clipped inside window */}
        <g clipPath="url(#houseClip)">
          <g className="code-scroll">
            {[
              { y: 115, text: "<Web>",        color: "#CE1126" },
              { y: 128, text: "  build();",   color: "#60A5FA" },
              { y: 141, text: "  design();",  color: "#34D399" },
              { y: 154, text: "</Web>",        color: "#CE1126" },
              { y: 167, text: "<Web>",        color: "#CE1126" },
              { y: 180, text: "  build();",   color: "#60A5FA" },
            ].map((l, i) => (
              <text key={i} x="50" y={l.y} fontSize="11" fontFamily="monospace" fill={l.color}>{l.text}</text>
            ))}
          </g>
        </g>

        {/* Cursor */}
        <rect x="94" y="149" width="7" height="11" rx="1" fill="#F9FAFB" className="cursor-blink" />

        {/* Door */}
        <rect x="82" y="148" width="36" height="32" rx="3"
          fill="#002B7F" stroke="#1E40AF" strokeWidth="1.5" />
        <circle cx="115" cy="164" r="2.5" fill="#F9FAFB" />

        {/* Chimney */}
        <rect x="130" y="44" width="14" height="30" rx="2" fill="#1E3A8A" />
      </svg>
    </div>
  );
}
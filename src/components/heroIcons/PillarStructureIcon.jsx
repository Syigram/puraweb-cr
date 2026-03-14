import React from "react";

export default function PillarStructureIcon() {
  return (
    <svg viewBox="0 0 200 200" className="w-64 h-64 drop-shadow-lg">
      <defs>
        <linearGradient id="pillarGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#002B7F" />
          <stop offset="100%" stopColor="#1e5ba8" />
        </linearGradient>
      </defs>

      {/* Background */}
      <circle cx="100" cy="100" r="95" fill="white" stroke="#e5e7eb" strokeWidth="1" />

      {/* Foundation line */}
      <line x1="35" y1="145" x2="165" y2="145" stroke="#002B7F" strokeWidth="3" opacity="0.7" />

      {/* Three pillars */}
      {[50, 100, 150].map((x) => (
        <g key={x}>
          {/* Pillar */}
          <rect x={x - 8} y="80" width="16" height="65" fill="url(#pillarGrad)" />
          <rect x={x - 8} y="80" width="16" height="3" fill="#CE1126" opacity="0.6" />

          {/* Capital (top decoration) */}
          <polygon points={`${x - 10},75 ${x + 10},75 ${x + 8},80 ${x - 8},80`} fill="#002B7F" opacity="0.8" />

          {/* Base */}
          <rect x={x - 12} y="142" width="24" height="5" fill="#002B7F" opacity="0.5" />
        </g>
      ))}

      {/* Arch connecting pillars */}
      <path d="M 42 78 Q 100 55 158 78" fill="none" stroke="#002B7F" strokeWidth="2" opacity="0.4" />

      {/* Central weight indicator */}
      <circle cx="100" cy="50" r="5" fill="#CE1126" opacity="0.6" />
      <text x="100" y="55" textAnchor="middle" fontSize="8" fill="#CE1126" opacity="0.6">Carga</text>
    </svg>
  );
}
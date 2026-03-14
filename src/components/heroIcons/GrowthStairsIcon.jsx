import React from "react";

export default function GrowthStairsIcon() {
  return (
    <svg viewBox="0 0 200 200" className="w-64 h-64 drop-shadow-lg">
      <defs>
        <linearGradient id="stairsGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#002B7F" />
          <stop offset="100%" stopColor="#CE1126" />
        </linearGradient>
      </defs>

      {/* Background */}
      <circle cx="100" cy="100" r="95" fill="white" stroke="#e5e7eb" strokeWidth="1" />

      {/* Stair steps */}
      {[0, 1, 2, 3, 4].map((i) => {
        const x = 50 + i * 20;
        const y = 135 - i * 17;
        return (
          <g key={i}>
            {/* Step */}
            <rect x={x} y={y} width="22" height="17" fill="url(#stairsGrad)" opacity={0.9 - i * 0.1} stroke="#002B7F" strokeWidth="1" />
            {/* Step highlight */}
            <line x1={x} y1={y} x2={x + 22} y2={y} stroke="white" strokeWidth="1" opacity="0.5" />
          </g>
        );
      })}

      {/* Figure climbing */}
      <g>
        {/* Head */}
        <circle cx="155" cy="60" r="4" fill="#CE1126" />
        {/* Body line */}
        <line x1="155" y1="64" x2="155" y2="75" stroke="#CE1126" strokeWidth="1.5" />
        {/* Arms */}
        <line x1="155" y1="68" x2="150" y2="65" stroke="#CE1126" strokeWidth="1.5" />
        <line x1="155" y1="68" x2="160" y2="65" stroke="#CE1126" strokeWidth="1.5" />
      </g>

      {/* Arrow showing upward momentum */}
      <path d="M 165 75 L 165 45" fill="none" stroke="#CE1126" strokeWidth="2" opacity="0.6" />
      <polygon points="165,45 162,52 168,52" fill="#CE1126" opacity="0.6" />

      {/* Base foundation line */}
      <line x1="45" y1="152" x2="170" y2="152" stroke="#002B7F" strokeWidth="2" opacity="0.4" />

      {/* Milestone circles */}
      {[50, 80, 110, 140].map((x) => (
        <circle key={`milestone-${x}`} cx={x} cy="160" r="2" fill="#002B7F" opacity="0.5" />
      ))}
    </svg>
  );
}
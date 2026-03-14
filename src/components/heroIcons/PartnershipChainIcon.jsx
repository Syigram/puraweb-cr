import React from "react";

export default function PartnershipChainIcon() {
  return (
    <svg viewBox="0 0 200 200" className="w-64 h-64 drop-shadow-lg">
      <defs>
        <linearGradient id="chainGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#002B7F" />
          <stop offset="50%" stopColor="#CE1126" />
          <stop offset="100%" stopColor="#002B7F" />
        </linearGradient>
      </defs>

      {/* Background */}
      <circle cx="100" cy="100" r="95" fill="white" stroke="#e5e7eb" strokeWidth="1" />

      {/* Chain links */}
      {[40, 70, 100, 130, 160].map((x, i) => (
        <g key={i}>
          {/* Link oval */}
          <ellipse cx={x} cy="100" rx="12" ry="18" fill="none" stroke="url(#chainGrad)" strokeWidth="2.5" opacity="0.8" />
          
          {/* Core dot */}
          <circle cx={x} cy="100" r="3" fill={i % 2 === 0 ? "#002B7F" : "#CE1126"} />
        </g>
      ))}

      {/* Connection lines between links */}
      {[40, 70, 100, 130].map((x, i) => (
        <line key={`con-${i}`} x1={x + 12} y1="100" x2={x + 28} y2="100" stroke="#002B7F" strokeWidth="1.5" opacity="0.3" />
      ))}

      {/* Upward arrows indicating strength */}
      {[50, 100, 150].map((x) => (
        <g key={`arrow-${x}`} opacity="0.4">
          <path d={`M ${x} 130 L ${x} 115`} stroke="#CE1126" strokeWidth="1.5" />
          <polygon points={`${x},115 ${x - 2},120 ${x + 2},120`} fill="#CE1126" />
        </g>
      ))}

      {/* Decorative bands */}
      <rect x="35" y="98" width="130" height="4" fill="#002B7F" opacity="0.1" rx="2" />
    </svg>
  );
}
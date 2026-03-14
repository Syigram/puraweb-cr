import React from "react";

export default function ProcessNetworkIcon() {
  return (
    <svg viewBox="0 0 200 200" className="w-64 h-64 drop-shadow-lg">
      <defs>
        <linearGradient id="networkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#002B7F" />
          <stop offset="100%" stopColor="#1e5ba8" />
        </linearGradient>
        <radialGradient id="nodeGlow">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#002B7F" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background */}
      <circle cx="100" cy="100" r="95" fill="white" stroke="#e5e7eb" strokeWidth="1" />

      {/* Central node - larger */}
      <circle cx="100" cy="100" r="16" fill="url(#networkGrad)" />
      <circle cx="100" cy="100" r="16" fill="url(#nodeGlow)" opacity="0.3" />

      {/* Connection lines to nodes */}
      <line x1="100" y1="100" x2="60" y2="60" stroke="#002B7F" strokeWidth="2" opacity="0.4" />
      <line x1="100" y1="100" x2="140" y2="60" stroke="#002B7F" strokeWidth="2" opacity="0.4" />
      <line x1="100" y1="100" x2="140" y2="140" stroke="#002B7F" strokeWidth="2" opacity="0.4" />
      <line x1="100" y1="100" x2="60" y2="140" stroke="#002B7F" strokeWidth="2" opacity="0.4" />
      <line x1="100" y1="100" x2="100" y2="50" stroke="#CE1126" strokeWidth="2" opacity="0.5" />
      <line x1="100" y1="100" x2="100" y2="150" stroke="#002B7F" strokeWidth="2" opacity="0.4" />

      {/* Outer nodes */}
      {[
        { cx: 60, cy: 60, delay: 0 },
        { cx: 140, cy: 60, delay: 0.2 },
        { cx: 140, cy: 140, delay: 0.4 },
        { cx: 60, cy: 140, delay: 0.6 },
        { cx: 100, cy: 50, delay: 0.1 },
        { cx: 100, cy: 150, delay: 0.3 }
      ].map((node, i) => (
        <g key={i}>
          <circle cx={node.cx} cy={node.cy} r="10" fill="white" stroke="#002B7F" strokeWidth="2" />
          <circle cx={node.cx} cy={node.cy} r="4" fill={i === 4 ? "#CE1126" : "#002B7F"} />
        </g>
      ))}

      {/* Decorative line at bottom */}
      <line x1="40" y1="170" x2="160" y2="170" stroke="#002B7F" strokeWidth="1.5" opacity="0.2" />
    </svg>
  );
}
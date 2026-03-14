import React from "react";

export default function TransparencyWindowIcon() {
  return (
    <svg viewBox="0 0 200 200" className="w-64 h-64 drop-shadow-lg">
      <defs>
        <linearGradient id="windowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#002B7F" />
          <stop offset="100%" stopColor="#1e5ba8" />
        </linearGradient>
      </defs>

      {/* Background */}
      <circle cx="100" cy="100" r="95" fill="white" stroke="#e5e7eb" strokeWidth="1" />

      {/* Window frame */}
      <rect x="50" y="50" width="100" height="100" fill="none" stroke="url(#windowGrad)" strokeWidth="3" rx="4" />

      {/* Vertical divider */}
      <line x1="100" y1="50" x2="100" y2="150" stroke="#002B7F" strokeWidth="1.5" opacity="0.3" />

      {/* Horizontal dividers */}
      <line x1="50" y1="75" x2="150" y2="75" stroke="#002B7F" strokeWidth="1.5" opacity="0.3" />
      <line x1="50" y1="100" x2="150" y2="100" stroke="#002B7F" strokeWidth="1.5" opacity="0.3" />
      <line x1="50" y1="125" x2="150" y2="125" stroke="#002B7F" strokeWidth="1.5" opacity="0.3" />

      {/* Content indicators - circles representing data */}
      <circle cx="72.5" cy="62.5" r="5" fill="#CE1126" opacity="0.7" />
      <circle cx="127.5" cy="62.5" r="5" fill="#002B7F" opacity="0.5" />
      <circle cx="72.5" cy="87.5" r="5" fill="#002B7F" opacity="0.5" />
      <circle cx="127.5" cy="87.5" r="5" fill="#CE1126" opacity="0.7" />
      <circle cx="72.5" cy="112.5" r="5" fill="#002B7F" opacity="0.5" />
      <circle cx="127.5" cy="112.5" r="5" fill="#002B7F" opacity="0.5" />
      <circle cx="72.5" cy="137.5" r="4" fill="#CE1126" opacity="0.6" />
      <circle cx="127.5" cy="137.5" r="4" fill="#002B7F" opacity="0.4" />

      {/* Eye symbol in corner - representing visibility */}
      <g opacity="0.4">
        <path d="M 155 40 Q 160 35 165 40 Q 160 45 155 40" fill="none" stroke="#002B7F" strokeWidth="1" />
        <circle cx="160" cy="40" r="1.5" fill="#002B7F" />
      </g>
    </svg>
  );
}
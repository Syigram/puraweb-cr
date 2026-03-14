import React from "react";

export default function TrustCompassIcon() {
  return (
    <svg viewBox="0 0 200 200" className="w-64 h-64 drop-shadow-lg">
      <defs>
        <linearGradient id="compassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#002B7F" />
          <stop offset="100%" stopColor="#1e5ba8" />
        </linearGradient>
      </defs>

      {/* Background */}
      <circle cx="100" cy="100" r="95" fill="white" stroke="#e5e7eb" strokeWidth="1" />

      {/* Outer compass ring */}
      <circle cx="100" cy="100" r="60" fill="none" stroke="url(#compassGrad)" strokeWidth="2" />

      {/* Cardinal directions - N, S, E, W */}
      <g fontSize="12" fontWeight="bold" fill="#002B7F" opacity="0.7" textAnchor="middle">
        <text x="100" y="40">N</text>
        <text x="160" y="105">E</text>
        <text x="100" y="168">S</text>
        <text x="40" y="105">O</text>
      </g>

      {/* Outer tick marks */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 100 + 55 * Math.cos(rad);
        const y1 = 100 + 55 * Math.sin(rad);
        const x2 = 100 + 62 * Math.cos(rad);
        const y2 = 100 + 62 * Math.sin(rad);
        return (
          <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#002B7F" strokeWidth="1" opacity="0.3" />
        );
      })}

      {/* Needle pointing North - red (trust/direction) */}
      <polygon points="100,45 95,90 100,85 105,90" fill="#CE1126" />

      {/* Center rose - 4 pointed star */}
      <g fill="#002B7F" opacity="0.8">
        <polygon points="100,75 103,90 100,100 97,90" />
        <polygon points="125,100 110,103 100,100 110,97" />
        <polygon points="100,125 97,110 100,100 103,110" />
        <polygon points="75,100 90,97 100,100 90,103" />
      </g>

      {/* Center circle - trust core */}
      <circle cx="100" cy="100" r="8" fill="#CE1126" />
      <circle cx="100" cy="100" r="4" fill="white" />

      {/* Decorative concentric circles */}
      <circle cx="100" cy="100" r="30" fill="none" stroke="#002B7F" strokeWidth="1" opacity="0.2" />
      <circle cx="100" cy="100" r="45" fill="none" stroke="#002B7F" strokeWidth="0.5" opacity="0.1" />
    </svg>
  );
}
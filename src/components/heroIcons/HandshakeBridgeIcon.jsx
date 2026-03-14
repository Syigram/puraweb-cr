import React from "react";

export default function HandshakeBridgeIcon() {
  return (
    <svg viewBox="0 0 200 200" className="w-64 h-64 drop-shadow-lg">
      <defs>
        <linearGradient id="bridgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#CE1126" />
          <stop offset="100%" stopColor="#a00a20" />
        </linearGradient>
      </defs>

      {/* Background */}
      <circle cx="100" cy="100" r="95" fill="white" stroke="#e5e7eb" strokeWidth="1" />

      {/* Support pillars */}
      <rect x="55" y="110" width="12" height="35" fill="#002B7F" opacity="0.6" />
      <rect x="133" y="110" width="12" height="35" fill="#002B7F" opacity="0.6" />

      {/* Bridge deck */}
      <path d="M 61 110 Q 100 90 145 110" fill="url(#bridgeGrad)" stroke="#CE1126" strokeWidth="2" />

      {/* Decorative arch */}
      <path d="M 61 110 Q 100 75 145 110" fill="none" stroke="#CE1126" strokeWidth="1.5" opacity="0.3" />

      {/* Two hands meeting in middle */}
      <g>
        {/* Left hand */}
        <circle cx="92" cy="105" r="6" fill="#CE1126" />
        <path d="M 92 105 L 88 95 M 92 105 L 86 98 M 92 105 L 90 97" stroke="#CE1126" strokeWidth="1.5" opacity="0.7" />

        {/* Right hand */}
        <circle cx="108" cy="105" r="6" fill="#002B7F" />
        <path d="M 108 105 L 112 95 M 108 105 L 114 98 M 108 105 L 110 97" stroke="#002B7F" strokeWidth="1.5" opacity="0.7" />
      </g>

      {/* Connection spark */}
      <circle cx="100" cy="105" r="3" fill="#CE1126" />
      <circle cx="100" cy="105" r="4" fill="none" stroke="#CE1126" strokeWidth="0.5" opacity="0.5" />

      {/* Ground line */}
      <line x1="40" y1="145" x2="160" y2="145" stroke="#002B7F" strokeWidth="1.5" opacity="0.3" />
    </svg>
  );
}
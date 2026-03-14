import React from "react";

export default function LockShieldIcon() {
  return (
    <svg viewBox="0 0 200 200" className="w-64 h-64 drop-shadow-lg">
      <defs>
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#002B7F" />
          <stop offset="100%" stopColor="#1e5ba8" />
        </linearGradient>
      </defs>

      {/* Background */}
      <circle cx="100" cy="100" r="95" fill="white" stroke="#e5e7eb" strokeWidth="1" />

      {/* Shield outline */}
      <path d="M 100 50 L 140 70 L 140 110 Q 100 145 100 145 Q 60 145 60 110 L 60 70 Z" 
            fill="url(#shieldGrad)" opacity="0.8" stroke="#002B7F" strokeWidth="2" />

      {/* Inner shield - lighter */}
      <path d="M 100 60 L 135 78 L 135 110 Q 100 138 100 138 Q 65 138 65 110 L 65 78 Z" 
            fill="white" opacity="0.6" />

      {/* Lock in center */}
      <g>
        {/* Lock body */}
        <rect x="90" y="95" width="20" height="20" fill="#002B7F" rx="2" />
        
        {/* Lock shackle */}
        <path d="M 93 95 Q 93 80 100 80 Q 107 80 107 95" fill="none" stroke="#002B7F" strokeWidth="2.5" />

        {/* Key hole */}
        <circle cx="100" cy="108" r="2.5" fill="#CE1126" />

        {/* Decorative check mark inside shield */}
        <path d="M 70 100 L 75 110 L 85 95" fill="none" stroke="#CE1126" strokeWidth="2" opacity="0.5" strokeLinecap="round" />
      </g>

      {/* Dots representing protection layers */}
      <circle cx="125" cy="75" r="2" fill="#CE1126" opacity="0.4" />
      <circle cx="125" cy="95" r="2" fill="#CE1126" opacity="0.4" />
      <circle cx="75" cy="95" r="2" fill="#CE1126" opacity="0.4" />
    </svg>
  );
}
import React from "react";

export default function TeamNetworkIcon() {
  return (
    <div className="relative w-60 h-60 flex items-center justify-center select-none">
      <style>{`
        @keyframes personBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes connPulse { 0%,100%{opacity:0.3;stroke-width:1.5} 50%{opacity:0.9;stroke-width:2.5} }
        @keyframes centerSpin { from{transform:rotate(0)} to{transform:rotate(360deg)} }
        .person-1 { animation: personBob 2.0s ease-in-out 0.0s infinite; transform-origin: 100px 60px; }
        .person-2 { animation: personBob 2.0s ease-in-out 0.4s infinite; transform-origin: 155px 130px; }
        .person-3 { animation: personBob 2.0s ease-in-out 0.8s infinite; transform-origin: 125px 175px; }
        .person-4 { animation: personBob 2.0s ease-in-out 1.2s infinite; transform-origin: 75px 175px; }
        .person-5 { animation: personBob 2.0s ease-in-out 1.6s infinite; transform-origin: 45px 130px; }
        .conn-1 { animation: connPulse 2.5s ease-in-out 0.0s infinite; }
        .conn-2 { animation: connPulse 2.5s ease-in-out 0.5s infinite; }
        .conn-3 { animation: connPulse 2.5s ease-in-out 1.0s infinite; }
        .conn-4 { animation: connPulse 2.5s ease-in-out 1.5s infinite; }
        .conn-5 { animation: connPulse 2.5s ease-in-out 2.0s infinite; }
        .center-spin { animation: centerSpin 8s linear infinite; transform-origin: 100px 110px; }
      `}</style>
      <svg viewBox="0 0 200 200" className="w-full h-full">

        {/* Connection lines */}
        <line x1="100" y1="60"  x2="155" y2="130" stroke="#002B7F" strokeWidth="1.5" className="conn-1" />
        <line x1="155" y1="130" x2="125" y2="175" stroke="#002B7F" strokeWidth="1.5" className="conn-2" />
        <line x1="125" y1="175" x2="75"  y2="175" stroke="#002B7F" strokeWidth="1.5" className="conn-3" />
        <line x1="75"  y1="175" x2="45"  y2="130" stroke="#002B7F" strokeWidth="1.5" className="conn-4" />
        <line x1="45"  y1="130" x2="100" y2="60"  stroke="#002B7F" strokeWidth="1.5" className="conn-5" />
        {/* Spokes to center */}
        <line x1="100" y1="60"  x2="100" y2="110" stroke="#CE1126" strokeWidth="1" opacity="0.35" />
        <line x1="155" y1="130" x2="100" y2="110" stroke="#CE1126" strokeWidth="1" opacity="0.35" />
        <line x1="125" y1="175" x2="100" y2="110" stroke="#CE1126" strokeWidth="1" opacity="0.35" />
        <line x1="75"  y1="175" x2="100" y2="110" stroke="#CE1126" strokeWidth="1" opacity="0.35" />
        <line x1="45"  y1="130" x2="100" y2="110" stroke="#CE1126" strokeWidth="1" opacity="0.35" />

        {/* Center hub spinning */}
        <g className="center-spin">
          <circle cx="100" cy="110" r="14" fill="none" stroke="#002B7F" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.4" />
        </g>
        <circle cx="100" cy="110" r="10" fill="#002B7F" />
        <text x="100" y="114" textAnchor="middle" fontSize="9" fill="white" fontFamily="monospace">PW</text>

        {/* Person at top */}
        <g className="person-1">
          <circle cx="100" cy="48" r="10" fill="#FCD9A0" stroke="#D97706" strokeWidth="1.5" />
          <rect   x="91"  cy="62" width="18" height="16" rx="4" y="62" fill="#002B7F" />
        </g>

        {/* Person right */}
        <g className="person-2">
          <circle cx="155" cy="118" r="10" fill="#FCD9A0" stroke="#D97706" strokeWidth="1.5" />
          <rect   x="146" y="132" width="18" height="16" rx="4" fill="#CE1126" />
        </g>

        {/* Person bottom right */}
        <g className="person-3">
          <circle cx="125" cy="163" r="10" fill="#FCD9A0" stroke="#D97706" strokeWidth="1.5" />
          <rect   x="116" y="177" width="18" height="16" rx="4" fill="#1D4ED8" />
        </g>

        {/* Person bottom left */}
        <g className="person-4">
          <circle cx="75"  cy="163" r="10" fill="#FCD9A0" stroke="#D97706" strokeWidth="1.5" />
          <rect   x="66"  y="177" width="18" height="16" rx="4" fill="#002B7F" />
        </g>

        {/* Person left */}
        <g className="person-5">
          <circle cx="45" cy="118" r="10" fill="#FCD9A0" stroke="#D97706" strokeWidth="1.5" />
          <rect   x="36" y="132" width="18" height="16" rx="4" fill="#CE1126" />
        </g>
      </svg>
    </div>
  );
}
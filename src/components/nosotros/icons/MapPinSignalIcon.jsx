import React from "react";

// Variante 5: Pin con señal WiFi / cobertura animada hacia arriba
export default function MapPinSignalIcon() {
  return (
    <div className="relative w-60 h-60 flex items-center justify-center select-none">
      <style>{`
        @keyframes signalArc1 {
          0%,100% { opacity: 0; }
          20%,50% { opacity: 0.9; }
          80%     { opacity: 0; }
        }
        @keyframes signalArc2 {
          0%,10%  { opacity: 0; }
          35%,60% { opacity: 0.7; }
          90%     { opacity: 0; }
        }
        @keyframes signalArc3 {
          0%,20%  { opacity: 0; }
          50%,75% { opacity: 0.5; }
          100%    { opacity: 0; }
        }
        @keyframes pinSignalBounce {
          0%,100% { transform: translateY(0); }
          40%     { transform: translateY(-6px); }
        }
        @keyframes coverageGrow {
          0%   { r: 5; opacity: 0.5; }
          100% { r: 80; opacity: 0; }
        }
        @keyframes dotConnect {
          0%,100% { opacity: 0.2; r: 3; }
          50%     { opacity: 1;   r: 5; }
        }
        .arc-1 { animation: signalArc1 2.4s ease-in-out 0.0s infinite; }
        .arc-2 { animation: signalArc2 2.4s ease-in-out 0.3s infinite; }
        .arc-3 { animation: signalArc3 2.4s ease-in-out 0.6s infinite; }
        .pin-sb { animation: pinSignalBounce 2s ease-in-out infinite; transform-origin: 100px 142px; }
        .cov-1  { animation: coverageGrow 3s ease-out 0s infinite; }
        .cov-2  { animation: coverageGrow 3s ease-out 1s infinite; }
        .dot-1  { animation: dotConnect 2.4s ease-in-out 0.2s infinite; }
        .dot-2  { animation: dotConnect 2.4s ease-in-out 0.9s infinite; }
        .dot-3  { animation: dotConnect 2.4s ease-in-out 1.6s infinite; }
        .dot-4  { animation: dotConnect 2.4s ease-in-out 0.5s infinite; }
      `}</style>
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <radialGradient id="sigBg" cx="50%" cy="70%" r="55%">
            <stop offset="0%" stopColor="#EFF6FF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#EFF6FF" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background glow */}
        <circle cx="100" cy="140" r="70" fill="url(#sigBg)" />

        {/* Coverage ripples */}
        <circle cx="100" cy="140" r="5" fill="none" stroke="#002B7F" strokeWidth="1.5" opacity="0" className="cov-1" />
        <circle cx="100" cy="140" r="5" fill="none" stroke="#CE1126" strokeWidth="1"   opacity="0" className="cov-2" />

        {/* WiFi signal arcs — above pin */}
        <path d="M68,75 A45,45 0 0,1 132,75"
          fill="none" stroke="#002B7F" strokeWidth="3.5" strokeLinecap="round"
          className="arc-3" />
        <path d="M78,85 A31,31 0 0,1 122,85"
          fill="none" stroke="#1D4ED8" strokeWidth="3" strokeLinecap="round"
          className="arc-2" />
        <path d="M88,95 A18,18 0 0,1 112,95"
          fill="none" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round"
          className="arc-1" />

        {/* Signal center dot */}
        <circle cx="100" cy="100" r="4" fill="#CE1126" />

        {/* Connecting lines to nearby dots */}
        <line x1="100" y1="100" x2="42"  y2="70"  stroke="#93C5FD" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />
        <line x1="100" y1="100" x2="158" y2="78"  stroke="#93C5FD" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />
        <line x1="100" y1="100" x2="168" y2="130" stroke="#FCA5A5" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />
        <line x1="100" y1="100" x2="32"  y2="122" stroke="#93C5FD" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />

        {/* Satellite dots */}
        <circle cx="42"  cy="70"  r="5" fill="#002B7F" className="dot-1" />
        <circle cx="158" cy="78"  r="5" fill="#CE1126" className="dot-2" />
        <circle cx="168" cy="130" r="5" fill="#1D4ED8" className="dot-3" />
        <circle cx="32"  cy="122" r="5" fill="#002B7F" className="dot-4" />

        {/* Map pin */}
        <g className="pin-sb">
          <path d="M100,105 C82,105 66,119 66,136 C66,157 100,178 100,178 C100,178 134,157 134,136 C134,119 118,105 100,105 Z"
            fill="#CE1126" stroke="#991B1B" strokeWidth="2" />
          <circle cx="100" cy="135" r="18" fill="white" opacity="0.95" />
          <rect x="84" y="127" width="32" height="4.5" rx="1.5" fill="#002B7F" />
          <rect x="84" y="133.5" width="32" height="4.5" rx="1.5" fill="#CE1126" />
          <rect x="84" y="140" width="32" height="4.5" rx="1.5" fill="#002B7F" />
          <ellipse cx="100" cy="180" rx="14" ry="4" fill="#002B7F" opacity="0.1" />
        </g>
      </svg>
    </div>
  );
}
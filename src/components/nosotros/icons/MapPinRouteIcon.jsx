import React from "react";

// Variante 4: Ruta animada entre varios pines conectados
export default function MapPinRouteIcon() {
  return (
    <div className="relative w-60 h-60 flex items-center justify-center select-none">
      <style>{`
        @keyframes routeDraw {
          from { stroke-dashoffset: 500; }
          to   { stroke-dashoffset: 0;   }
        }
        @keyframes carMove {
          0%   { offset-distance: 0%;   opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        @keyframes pinDropA { 0%{opacity:0;transform:translateY(-20px)} 20%{opacity:1;transform:translateY(0)} 100%{opacity:1;transform:translateY(0)} }
        @keyframes pinDropB { 0%,25%{opacity:0;transform:translateY(-20px)} 45%{opacity:1;transform:translateY(0)} 100%{opacity:1;transform:translateY(0)} }
        @keyframes pinDropC { 0%,55%{opacity:0;transform:translateY(-20px)} 75%{opacity:1;transform:translateY(0)} 100%{opacity:1;transform:translateY(0)} }
        @keyframes pinDropD { 0%,75%{opacity:0;transform:translateY(-20px)} 95%{opacity:1;transform:translateY(0)} 100%{opacity:1;transform:translateY(0)} }
        .route-line { stroke-dasharray: 500; animation: routeDraw 4s ease-in-out infinite alternate; }
        .pin-a { animation: pinDropA 4s ease-out infinite; }
        .pin-b { animation: pinDropB 4s ease-out infinite; }
        .pin-c { animation: pinDropC 4s ease-out infinite; }
        .pin-d { animation: pinDropD 4s ease-out infinite; }
      `}</style>
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#002B7F" />
            <stop offset="50%" stopColor="#CE1126" />
            <stop offset="100%" stopColor="#002B7F" />
          </linearGradient>
        </defs>

        {/* Faint grid */}
        {[40,80,120,160].map(x => (
          <line key={`v${x}`} x1={x} y1="20" x2={x} y2="180" stroke="#F1F5F9" strokeWidth="1" />
        ))}
        {[40,80,120,160].map(y => (
          <line key={`h${y}`} x1="20" y1={y} x2="180" y2={y} stroke="#F1F5F9" strokeWidth="1" />
        ))}

        {/* Route path */}
        <path d="M38,155 Q60,90 100,75 Q140,60 162,38"
          fill="none" stroke="url(#routeGrad)" strokeWidth="3"
          strokeLinecap="round" className="route-line" />

        {/* Shadow route */}
        <path d="M38,155 Q60,90 100,75 Q140,60 162,38"
          fill="none" stroke="#CBD5E1" strokeWidth="6"
          strokeLinecap="round" opacity="0.3" />

        {/* Moving dot */}
        <circle r="5" fill="#F97316">
          <animateMotion path="M38,155 Q60,90 100,75 Q140,60 162,38"
            dur="4s" repeatCount="indefinite" />
        </circle>

        {/* Pin A — Start */}
        <g className="pin-a">
          <path d="M38,130 C31,130 25,136 25,143 C25,152 38,162 38,162 C38,162 51,152 51,143 C51,136 45,130 38,130 Z"
            fill="#002B7F" stroke="#001A4D" strokeWidth="1.5" />
          <circle cx="38" cy="142" r="7" fill="white" opacity="0.9" />
          <text x="38" y="145" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#002B7F">A</text>
          <ellipse cx="38" cy="163" rx="8" ry="2.5" fill="#002B7F" opacity="0.1" />
        </g>

        {/* Pin B */}
        <g className="pin-b">
          <path d="M75,95 C68,95 62,101 62,108 C62,117 75,127 75,127 C75,127 88,117 88,108 C88,101 82,95 75,95 Z"
            fill="#1D4ED8" stroke="#1E3A8A" strokeWidth="1.5" />
          <circle cx="75" cy="107" r="7" fill="white" opacity="0.9" />
          <text x="75" y="110" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#1D4ED8">B</text>
          <ellipse cx="75" cy="128" rx="8" ry="2.5" fill="#1D4ED8" opacity="0.1" />
        </g>

        {/* Pin C */}
        <g className="pin-c">
          <path d="M125,55 C118,55 112,61 112,68 C112,77 125,87 125,87 C125,87 138,77 138,68 C138,61 132,55 125,55 Z"
            fill="#CE1126" stroke="#991B1B" strokeWidth="1.5" />
          <circle cx="125" cy="67" r="7" fill="white" opacity="0.9" />
          <text x="125" y="70" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#CE1126">C</text>
          <ellipse cx="125" cy="88" rx="8" ry="2.5" fill="#CE1126" opacity="0.1" />
        </g>

        {/* Pin D — End (main, larger) */}
        <g className="pin-d">
          <path d="M162,18 C150,18 140,28 140,40 C140,56 162,72 162,72 C162,72 184,56 184,40 C184,28 174,18 162,18 Z"
            fill="#CE1126" stroke="#991B1B" strokeWidth="2" />
          <circle cx="162" cy="39" r="13" fill="white" opacity="0.95" />
          <rect x="149" y="32" width="26" height="3.5" rx="1" fill="#002B7F" />
          <rect x="149" y="37.5" width="26" height="3.5" rx="1" fill="#CE1126" />
          <rect x="149" y="43" width="26" height="3.5" rx="1" fill="#002B7F" />
          <ellipse cx="162" cy="74" rx="12" ry="3" fill="#002B7F" opacity="0.12" />
        </g>
      </svg>
    </div>
  );
}
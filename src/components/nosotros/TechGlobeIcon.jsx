import React, { useEffect, useRef } from "react";

const NODES = [
  { cx: 100, cy: 38 },
  { cx: 168, cy: 72 },
  { cx: 158, cy: 155 },
  { cx: 75,  cy: 168 },
  { cx: 28,  cy: 105 },
  { cx: 128, cy: 112 },
];

const CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 0],
  [0, 5], [1, 5], [2, 5], [3, 5], [4, 5],
];

// Pulses travel along specific connections
const PULSES = [
  { conn: 0, delay: 0 },
  { conn: 2, delay: 0.8 },
  { conn: 4, delay: 1.6 },
  { conn: 6, delay: 2.4 },
  { conn: 8, delay: 0.4 },
];

export default function TechGlobeIcon() {
  return (
    <div className="relative w-60 h-60 flex items-center justify-center select-none">
      <style>{`
        @keyframes spinCW  { from { transform: rotate(0deg);   } to { transform: rotate(360deg);  } }
        @keyframes spinCCW { from { transform: rotate(0deg);   } to { transform: rotate(-360deg); } }
        @keyframes pulse   { 0%,100% { r: 3; opacity: 0.9; } 50% { r: 5; opacity: 0.5; } }
        @keyframes nodeGlow { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes travelPulse {
          0%   { opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { opacity: 0; }
        }

        .orbit-cw  { transform-origin: 100px 100px; animation: spinCW  16s linear infinite; }
        .orbit-ccw { transform-origin: 100px 100px; animation: spinCCW 22s linear infinite; }
        .orbit-cw2 { transform-origin: 100px 100px; animation: spinCW  30s linear infinite; }

        .node-pulse-0 { animation: nodeGlow 2.2s ease-in-out 0.0s infinite; }
        .node-pulse-1 { animation: nodeGlow 2.2s ease-in-out 0.4s infinite; }
        .node-pulse-2 { animation: nodeGlow 2.2s ease-in-out 0.8s infinite; }
        .node-pulse-3 { animation: nodeGlow 2.2s ease-in-out 1.2s infinite; }
        .node-pulse-4 { animation: nodeGlow 2.2s ease-in-out 1.6s infinite; }
        .node-pulse-5 { animation: nodeGlow 2.2s ease-in-out 2.0s infinite; }

        .center-pulse { animation: pulse 2.5s ease-in-out infinite; }

        .travel-dot { animation: travelPulse 2s ease-in-out infinite; }
        .travel-0 { animation-delay: 0s; }
        .travel-1 { animation-delay: 0.7s; }
        .travel-2 { animation-delay: 1.4s; }
        .travel-3 { animation-delay: 2.1s; }
        .travel-4 { animation-delay: 2.8s; }
      `}</style>

      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Soft background glow */}
        <defs>
          <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#002B7F" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#002B7F" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#CE1126" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#CE1126" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="96" fill="url(#bgGlow)" />

        {/* Outer circle border */}
        <circle cx="100" cy="100" r="90" fill="none" stroke="#002B7F" strokeWidth="0.8" opacity="0.15" />

        {/* Rotating orbit rings */}
        <g className="orbit-cw">
          <ellipse cx="100" cy="100" rx="90" ry="32"
            fill="none" stroke="#002B7F" strokeWidth="0.9" strokeDasharray="5 5" opacity="0.3" />
        </g>
        <g className="orbit-ccw">
          <ellipse cx="100" cy="100" rx="32" ry="90"
            fill="none" stroke="#CE1126" strokeWidth="0.9" strokeDasharray="5 5" opacity="0.22" />
        </g>
        <g className="orbit-cw2">
          <ellipse cx="100" cy="100" rx="65" ry="55"
            fill="none" stroke="#002B7F" strokeWidth="0.7" strokeDasharray="3 7" opacity="0.15"
            transform="rotate(45 100 100)" />
        </g>

        {/* Connection lines */}
        {CONNECTIONS.map(([a, b], i) => (
          <line
            key={i}
            x1={NODES[a].cx} y1={NODES[a].cy}
            x2={NODES[b].cx} y2={NODES[b].cy}
            stroke="#002B7F"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.28"
          />
        ))}

        {/* Traveling pulse dots along connections */}
        {PULSES.map(({ conn, delay }, i) => {
          const [a, b] = CONNECTIONS[conn];
          return (
            <circle key={`t${i}`} r="3" fill="#CE1126"
              className={`travel-dot travel-${i}`}
              style={{ animationDelay: `${delay}s`, opacity: 0 }}>
              <animateMotion
                dur="2s"
                repeatCount="indefinite"
                begin={`${delay}s`}
                fill="freeze"
                path={`M${NODES[a].cx},${NODES[a].cy} L${NODES[b].cx},${NODES[b].cy}`}
              />
            </circle>
          );
        })}

        {/* Nodes */}
        {NODES.map((n, i) => (
          <g key={`n${i}`} className={`node-pulse-${i}`}>
            <circle cx={n.cx} cy={n.cy} r="9"  fill="white" stroke="#002B7F" strokeWidth="1.5" opacity="0.9" />
            <circle cx={n.cx} cy={n.cy} r="4"  fill="#002B7F" />
          </g>
        ))}

        {/* Center hub */}
        <circle cx="100" cy="100" r="20" fill="url(#hubGlow)" />
        <circle cx="100" cy="100" r="13" fill="white" stroke="#002B7F" strokeWidth="2" />
        <circle cx="100" cy="100" r="6"  fill="#CE1126" className="center-pulse" />

        {/* Code label */}
        <text x="100" y="196" textAnchor="middle" fontSize="9"
          fill="#002B7F" opacity="0.4" fontFamily="monospace">{"</>"}</text>
      </svg>
    </div>
  );
}
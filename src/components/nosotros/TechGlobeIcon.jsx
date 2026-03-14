import React from "react";
import { motion } from "framer-motion";

const nodes = [
  { cx: 100, cy: 40 },
  { cx: 170, cy: 75 },
  { cx: 155, cy: 155 },
  { cx: 75, cy: 165 },
  { cx: 30, cy: 100 },
  { cx: 130, cy: 110 },
];

const connections = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [0, 5], [1, 5], [2, 5], [3, 5], [4, 5],
];

export default function TechGlobeIcon() {
  return (
    <div className="relative w-56 h-56 flex items-center justify-center select-none">
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(0,43,127,0.12) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Rotating dashed orbit rings */}
      <motion.svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 200 200"
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        <ellipse cx="100" cy="100" rx="90" ry="36" fill="none" stroke="#002B7F" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.3" />
      </motion.svg>

      <motion.svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 200 200"
        animate={{ rotate: -360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      >
        <ellipse cx="100" cy="100" rx="36" ry="90" fill="none" stroke="#CE1126" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.25" />
      </motion.svg>

      {/* Main SVG: globe circle + circuit lines + nodes */}
      <svg viewBox="0 0 200 200" className="w-full h-full" style={{ zIndex: 1 }}>
        {/* Globe outer circle */}
        <circle cx="100" cy="100" r="88" fill="none" stroke="#002B7F" strokeWidth="1.2" opacity="0.18" />

        {/* Circuit connection lines */}
        {connections.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={nodes[a].cx} y1={nodes[a].cy}
            x2={nodes[b].cx} y2={nodes[b].cy}
            stroke="#002B7F"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.35"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.35 }}
            transition={{ duration: 1.2, delay: i * 0.12, ease: "easeOut" }}
          />
        ))}

        {/* Pulse lines (animated traveling dots) */}
        {connections.slice(0, 5).map(([a, b], i) => (
          <motion.circle
            key={`pulse-${i}`}
            r="2.5"
            fill="#CE1126"
            opacity="0.7"
            animate={{
              cx: [nodes[a].cx, nodes[b].cx, nodes[a].cx],
              cy: [nodes[a].cy, nodes[b].cy, nodes[a].cy],
            }}
            transition={{
              duration: 2.4,
              delay: i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Static nodes */}
        {nodes.map((n, i) => (
          <g key={`node-${i}`}>
            <motion.circle
              cx={n.cx} cy={n.cy} r="7"
              fill="white"
              stroke="#002B7F"
              strokeWidth="1.5"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
            />
            <motion.circle
              cx={n.cx} cy={n.cy} r="3.5"
              fill="#002B7F"
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 2, delay: 0.6 + i * 0.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </g>
        ))}

        {/* Center hub */}
        <circle cx="100" cy="100" r="18" fill="#002B7F" opacity="0.07" />
        <motion.circle
          cx="100" cy="100" r="11"
          fill="white"
          stroke="#002B7F"
          strokeWidth="2"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <circle cx="100" cy="100" r="5" fill="#CE1126" opacity="0.9" />

        {/* "</>" label */}
        <text x="100" y="194" textAnchor="middle" fontSize="9" fill="#002B7F" opacity="0.45" fontFamily="monospace">{"</>"}</text>
      </svg>
    </div>
  );
}
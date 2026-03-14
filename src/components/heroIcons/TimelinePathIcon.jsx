import React from "react";

export default function TimelinePathIcon() {
  return (
    <svg viewBox="0 0 200 200" className="w-64 h-64 drop-shadow-lg">
      <defs>
        <linearGradient id="timeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#002B7F" />
          <stop offset="100%" stopColor="#CE1126" />
        </linearGradient>
      </defs>

      {/* Background */}
      <circle cx="100" cy="100" r="95" fill="white" stroke="#e5e7eb" strokeWidth="1" />

      {/* Timeline path */}
      <path d="M 50 140 Q 75 120 100 80 T 150 50" fill="none" stroke="url(#timeGrad)" strokeWidth="3" />

      {/* Milestone points */}
      {[
        { x: 50, y: 140, label: "Inicio", color: "#002B7F" },
        { x: 100, y: 80, label: "Proceso", color: "#1e5ba8" },
        { x: 150, y: 50, label: "Éxito", color: "#CE1126" }
      ].map((point, i) => (
        <g key={i}>
          {/* Glow */}
          <circle cx={point.x} cy={point.y} r="8" fill={point.color} opacity="0.2" />
          {/* Node */}
          <circle cx={point.x} cy={point.y} r="5" fill={point.color} />
          {/* Inner core */}
          <circle cx={point.x} cy={point.y} r="2.5" fill="white" />
        </g>
      ))}

      {/* Progress indicator - arrow following path */}
      <g opacity="0.7">
        <circle cx="75" cy="110" r="4" fill="#CE1126" />
      </g>

      {/* Decorative checkmarks */}
      <g opacity="0.3">
        <path d="M 45 145 L 48 148 L 52 144" fill="none" stroke="#002B7F" strokeWidth="1" />
        <path d="M 95 85 L 98 88 L 102 84" fill="none" stroke="#002B7F" strokeWidth="1" />
      </g>

      {/* End arrow - destination */}
      <g opacity="0.5">
        <path d="M 155 45 L 160 40 L 155 42" fill="#CE1126" />
      </g>
    </svg>
  );
}
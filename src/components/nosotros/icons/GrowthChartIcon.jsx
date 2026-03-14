import React from "react";

export default function GrowthChartIcon() {
  return (
    <div className="relative w-60 h-60 flex items-center justify-center select-none">
      <style>{`
        @keyframes drawLine {
          from { stroke-dashoffset: 400; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes barGrow-1 { from{transform:scaleY(0)} to{transform:scaleY(1)} }
        @keyframes floatBadge { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes countUp { 0%{opacity:0;transform:translateY(8px)} 30%{opacity:1;transform:translateY(0)} 90%{opacity:1} 100%{opacity:0;transform:translateY(-8px)} }
        .line-anim { stroke-dasharray:400; animation: drawLine 3s ease-in-out infinite alternate; }
        .bar-1 { transform-origin: 55px 140px;  animation: barGrow-1 2.5s ease-out 0.0s infinite alternate; }
        .bar-2 { transform-origin: 80px 140px;  animation: barGrow-1 2.5s ease-out 0.2s infinite alternate; }
        .bar-3 { transform-origin: 105px 140px; animation: barGrow-1 2.5s ease-out 0.4s infinite alternate; }
        .bar-4 { transform-origin: 130px 140px; animation: barGrow-1 2.5s ease-out 0.6s infinite alternate; }
        .bar-5 { transform-origin: 155px 140px; animation: barGrow-1 2.5s ease-out 0.8s infinite alternate; }
        .badge-float { animation: floatBadge 2s ease-in-out infinite; }
        .count-anim  { animation: countUp 3s ease-in-out infinite; }
      `}</style>
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#002B7F" />
            <stop offset="100%" stopColor="#BFDBFE" />
          </linearGradient>
          <linearGradient id="barGrad2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#CE1126" />
            <stop offset="100%" stopColor="#FCA5A5" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[60, 85, 110, 135].map(y => (
          <line key={y} x1="38" y1={y} x2="178" y2={y}
            stroke="#E2E8F0" strokeWidth="1" />
        ))}

        {/* Axes */}
        <line x1="38" y1="20" x2="38"  y2="145" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
        <line x1="38" y1="145" x2="178" y2="145" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />

        {/* Bars */}
        <rect x="45" y="108" width="20" height="37" rx="4" fill="url(#barGrad)"    className="bar-1" />
        <rect x="70" y="95"  width="20" height="50" rx="4" fill="url(#barGrad2)"   className="bar-2" />
        <rect x="95" y="80"  width="20" height="65" rx="4" fill="url(#barGrad)"    className="bar-3" />
        <rect x="120" y="62" width="20" height="83" rx="4" fill="url(#barGrad2)"   className="bar-4" />
        <rect x="145" y="42" width="20" height="103" rx="4" fill="url(#barGrad)"   className="bar-5" />

        {/* Trend line */}
        <polyline points="55,105 80,92 105,77 130,58 155,38"
          fill="none" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          className="line-anim" />

        {/* Trend dots */}
        {[[55,105],[80,92],[105,77],[130,58],[155,38]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="4" fill="white" stroke="#F97316" strokeWidth="2" />
        ))}

        {/* Floating badge */}
        <g className="badge-float">
          <rect x="130" y="20" width="52" height="22" rx="11" fill="#002B7F" />
          <text x="156" y="34" textAnchor="middle" fontSize="9"
            fontFamily="monospace" fill="white" className="count-anim">+150%</text>
        </g>

        {/* Y-axis labels */}
        <text x="34" y="62"  textAnchor="end" fontSize="8" fill="#94A3B8">100</text>
        <text x="34" y="112" textAnchor="end" fontSize="8" fill="#94A3B8">50</text>
        <text x="34" y="148" textAnchor="end" fontSize="8" fill="#94A3B8">0</text>
      </svg>
    </div>
  );
}
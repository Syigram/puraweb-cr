import React from "react";

// DNA double helix made of code — represents identity & craft
export default function DNACodeIcon() {
  const steps = 8;
  const height = 160;
  const midX = 100;
  const amp = 40;

  const points1 = Array.from({ length: steps * 2 + 1 }, (_, i) => {
    const t = i / (steps * 2);
    const y = 20 + t * height;
    const x = midX + amp * Math.sin(t * Math.PI * 4);
    return { x, y };
  });
  const points2 = Array.from({ length: steps * 2 + 1 }, (_, i) => {
    const t = i / (steps * 2);
    const y = 20 + t * height;
    const x = midX + amp * Math.sin(t * Math.PI * 4 + Math.PI);
    return { x, y };
  });

  const path1 = points1.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const path2 = points2.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

  // Rungs at every 2 steps
  const rungs = Array.from({ length: steps }, (_, i) => {
    const t = (i * 2 + 1) / (steps * 2);
    const y = 20 + t * height;
    const x1 = midX + amp * Math.sin(t * Math.PI * 4);
    const x2 = midX + amp * Math.sin(t * Math.PI * 4 + Math.PI);
    return { x1, x2, y, i };
  });

  const labels = ["<html>", "build()", "design", "deploy", ".css", "{}", "const", "async"];

  return (
    <div className="relative w-60 h-60 flex items-center justify-center select-none">
      <style>{`
        @keyframes helixScroll  { 0%{transform:translateY(0)} 100%{transform:translateY(-160px)} }
        @keyframes rungPulse    { 0%,100%{opacity:0.4} 50%{opacity:1} }
        .helix-scroll { animation: helixScroll 4s linear infinite; }
        ${Array.from({ length: 8 }, (_, i) => `.rung-${i} { animation: rungPulse 2s ease-in-out ${i * 0.25}s infinite; }`).join("\n")}
      `}</style>
      <svg viewBox="0 0 200 200" className="w-full h-full" overflow="hidden">
        <defs>
          <linearGradient id="strand1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#002B7F" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
          <linearGradient id="strand2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#CE1126" />
            <stop offset="100%" stopColor="#F87171" />
          </linearGradient>
          <clipPath id="dnaClip">
            <rect x="50" y="10" width="100" height="180" />
          </clipPath>
        </defs>

        <g clipPath="url(#dnaClip)">
          <g className="helix-scroll">
            {/* Two strands */}
            <path d={path1} fill="none" stroke="url(#strand1)" strokeWidth="3" strokeLinecap="round" />
            <path d={path2} fill="none" stroke="url(#strand2)" strokeWidth="3" strokeLinecap="round" />
            {/* Rungs */}
            {rungs.map((r) => (
              <g key={r.i} className={`rung-${r.i}`}>
                <line x1={r.x1} y1={r.y} x2={r.x2} y2={r.y}
                  stroke="#374151" strokeWidth="1.5" strokeLinecap="round" />
                <text x={midX} y={r.y + 4} textAnchor="middle"
                  fontSize="8" fontFamily="monospace" fill="#6B7280" opacity="0.85">
                  {labels[r.i % labels.length]}
                </text>
              </g>
            ))}
            {/* Repeat for infinite scroll */}
            <g transform={`translate(0, 160)`}>
              <path d={path1} fill="none" stroke="url(#strand1)" strokeWidth="3" strokeLinecap="round" />
              <path d={path2} fill="none" stroke="url(#strand2)" strokeWidth="3" strokeLinecap="round" />
              {rungs.map((r) => (
                <g key={`r2-${r.i}`} className={`rung-${r.i}`}>
                  <line x1={r.x1} y1={r.y} x2={r.x2} y2={r.y}
                    stroke="#374151" strokeWidth="1.5" strokeLinecap="round" />
                  <text x={midX} y={r.y + 4} textAnchor="middle"
                    fontSize="8" fontFamily="monospace" fill="#6B7280" opacity="0.85">
                    {labels[r.i % labels.length]}
                  </text>
                </g>
              ))}
            </g>
          </g>
        </g>

        {/* Top & bottom fade masks */}
        <rect x="50" y="10"  width="100" height="28" fill="white" opacity="0.9" />
        <rect x="50" y="162" width="100" height="28" fill="white" opacity="0.9" />
      </svg>
    </div>
  );
}
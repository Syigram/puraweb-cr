import React, { useEffect, useRef, useState } from "react";

const LINES = [
  { text: "$ whoami",                color: "#F9FAFB" },
  { text: "> PuraWeb CR",            color: "#34D399" },
  { text: "$ cat mission.txt",       color: "#F9FAFB" },
  { text: "> build amazing web",     color: "#60A5FA" },
  { text: "> with passion",          color: "#60A5FA" },
  { text: "$ git push origin main",  color: "#F9FAFB" },
  { text: "✓ Deployed!",             color: "#34D399" },
];

export default function TerminalTypingIcon() {
  const [visibleLines, setVisibleLines] = useState([]);
  const [charIdx, setCharIdx]           = useState(0);
  const [lineIdx, setLineIdx]           = useState(0);
  const [showCursor, setShowCursor]     = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    // Cursor blink
    const blink = setInterval(() => setShowCursor(p => !p), 530);
    return () => clearInterval(blink);
  }, []);

  useEffect(() => {
    if (lineIdx >= LINES.length) {
      // Reset after pause
      timerRef.current = setTimeout(() => {
        setVisibleLines([]);
        setLineIdx(0);
        setCharIdx(0);
      }, 1800);
      return;
    }
    const currentText = LINES[lineIdx].text;
    if (charIdx < currentText.length) {
      timerRef.current = setTimeout(() => setCharIdx(p => p + 1), 50);
    } else {
      timerRef.current = setTimeout(() => {
        setVisibleLines(prev => [...prev, LINES[lineIdx]]);
        setLineIdx(p => p + 1);
        setCharIdx(0);
      }, 250);
    }
    return () => clearTimeout(timerRef.current);
  }, [lineIdx, charIdx]);

  const currentPartial = lineIdx < LINES.length
    ? LINES[lineIdx].text.slice(0, charIdx)
    : "";
  const currentColor = lineIdx < LINES.length ? LINES[lineIdx].color : "#F9FAFB";

  return (
    <div className="relative w-60 h-60 flex items-center justify-center select-none">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Terminal window */}
        <rect x="15" y="25" width="170" height="155" rx="10"
          fill="#0F172A" stroke="#334155" strokeWidth="2" />
        {/* Title bar */}
        <rect x="15" y="25" width="170" height="24" rx="10" fill="#1E293B" />
        <rect x="15" y="37" width="170" height="12" fill="#1E293B" />
        {/* Traffic lights */}
        <circle cx="34" cy="37" r="5" fill="#EF4444" />
        <circle cx="50" cy="37" r="5" fill="#F59E0B" />
        <circle cx="66" cy="37" r="5" fill="#22C55E" />
        {/* Title */}
        <text x="100" y="42" textAnchor="middle" fontSize="9"
          fontFamily="monospace" fill="#94A3B8">terminal</text>
      </svg>

      {/* Typed text overlay */}
      <div className="absolute inset-0 flex flex-col justify-start pt-14 pl-5 pr-3 overflow-hidden"
        style={{ fontFamily: "monospace", fontSize: "10px", lineHeight: "16px" }}>
        {visibleLines.slice(-6).map((l, i) => (
          <div key={i} style={{ color: l.color, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {l.text}
          </div>
        ))}
        {lineIdx < LINES.length && (
          <div style={{ color: currentColor, whiteSpace: "nowrap" }}>
            {currentPartial}
            <span style={{ opacity: showCursor ? 1 : 0, background: currentColor, color: "#0F172A", padding: "0 2px" }}>
              &nbsp;
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
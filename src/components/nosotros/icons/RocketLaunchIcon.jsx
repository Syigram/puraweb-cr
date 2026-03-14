import React from "react";

export default function RocketLaunchIcon() {
  return (
    <div className="relative w-60 h-60 flex items-center justify-center select-none">
      <style>{`
        @keyframes rocketFly {
          0%   { transform: translateY(0) rotate(-35deg); }
          40%  { transform: translateY(-12px) rotate(-35deg); }
          100% { transform: translateY(0) rotate(-35deg); }
        }
        @keyframes flamePulse { 0%,100%{opacity:1;transform:scaleY(1)} 50%{opacity:0.7;transform:scaleY(1.3)} }
        @keyframes starTwinkle { 0%,100%{opacity:0.2;r:1.5} 50%{opacity:1;r:2.5} }
        @keyframes trailFade { 0%{opacity:0.8;stroke-dashoffset:0} 100%{opacity:0;stroke-dashoffset:80} }
        .rocket-fly    { animation: rocketFly 2.5s ease-in-out infinite; transform-origin: 100px 110px; }
        .flame-pulse   { animation: flamePulse 0.3s ease-in-out infinite; transform-origin: 100px 145px; }
        .star-1 { animation: starTwinkle 1.5s ease-in-out 0s infinite; }
        .star-2 { animation: starTwinkle 1.5s ease-in-out 0.3s infinite; }
        .star-3 { animation: starTwinkle 1.5s ease-in-out 0.7s infinite; }
        .star-4 { animation: starTwinkle 1.5s ease-in-out 1.1s infinite; }
        .trail-line { stroke-dasharray:80; animation: trailFade 0.8s linear infinite; }
      `}</style>
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <radialGradient id="skyGrad" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#EFF6FF" />
            <stop offset="100%" stopColor="#BFDBFE" />
          </radialGradient>
        </defs>

        {/* Sky background */}
        <ellipse cx="100" cy="100" r="88" fill="url(#skyGrad)" opacity="0.4" />

        {/* Stars */}
        <circle cx="40"  cy="35" r="2" fill="#93C5FD" className="star-1" />
        <circle cx="155" cy="45" r="2" fill="#93C5FD" className="star-2" />
        <circle cx="170" cy="80" r="1.5" fill="#60A5FA" className="star-3" />
        <circle cx="30"  cy="90" r="1.5" fill="#93C5FD" className="star-4" />

        {/* Launch trail */}
        <g transform="translate(80, 125) rotate(55)">
          <line x1="0" y1="0" x2="0" y2="70" stroke="#FCA5A5" strokeWidth="3" strokeLinecap="round" className="trail-line" />
        </g>
        <g transform="translate(88, 130) rotate(55)">
          <line x1="0" y1="0" x2="0" y2="55" stroke="#FDE68A" strokeWidth="2" strokeLinecap="round" className="trail-line" />
        </g>

        {/* Rocket group */}
        <g className="rocket-fly">
          {/* Body */}
          <ellipse cx="100" cy="105" rx="18" ry="38" fill="#002B7F" />
          {/* Nose cone */}
          <ellipse cx="100" cy="67" rx="18" ry="12" fill="#1D4ED8" />
          <path d="M82,72 Q100,38 118,72" fill="#1D4ED8" />
          {/* Window */}
          <circle cx="100" cy="98" r="9" fill="white" stroke="#60A5FA" strokeWidth="2" />
          <circle cx="100" cy="98" r="5" fill="#BFDBFE" />
          <circle cx="97"  cy="95" r="2" fill="white" opacity="0.7" />
          {/* Fins */}
          <polygon points="82,128 70,155 82,148" fill="#CE1126" />
          <polygon points="118,128 130,155 118,148" fill="#CE1126" />
          {/* Flame */}
          <g className="flame-pulse">
            <ellipse cx="100" cy="145" rx="10" ry="16" fill="#F97316" opacity="0.9" />
            <ellipse cx="100" cy="145" rx="6"  ry="10" fill="#FCD34D" opacity="0.95" />
            <ellipse cx="100" cy="143" rx="3"  ry="5"  fill="white" opacity="0.7" />
          </g>
        </g>
      </svg>
    </div>
  );
}
import React from "react";

// 1. Network Globe (Current - Tech Connection)
export function NetworkGlobeIcon() {
  return (
    <div className="relative flex items-center justify-center w-64 h-64 select-none">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <radialGradient id="glob1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#002B7F" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#002B7F" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="96" fill="url(#glob1)" />
        <circle cx="100" cy="100" r="90" fill="none" stroke="#002B7F" strokeWidth="0.8" opacity="0.15" />
        
        {/* Orbits */}
        <ellipse cx="100" cy="100" rx="70" ry="30" fill="none" stroke="#002B7F" strokeWidth="0.9" strokeDasharray="5 5" opacity="0.3" />
        <ellipse cx="100" cy="100" rx="30" ry="70" fill="none" stroke="#CE1126" strokeWidth="0.9" strokeDasharray="5 5" opacity="0.22" />
        
        {/* Network nodes */}
        {[
          { cx: 100, cy: 40 },
          { cx: 155, cy: 85 },
          { cx: 140, cy: 155 },
          { cx: 60, cy: 155 },
          { cx: 45, cy: 85 }
        ].map((node, i) => (
          <g key={i}>
            <circle cx={node.cx} cy={node.cy} r="6" fill="white" stroke="#002B7F" strokeWidth="1.5" opacity="0.9" />
          </g>
        ))}
        
        {/* Center hub */}
        <circle cx="100" cy="100" r="10" fill="#CE1126" opacity="0.7" />
      </svg>
    </div>
  );
}

// 2. Handshake - Partnership
export function HandshakeIcon() {
  return (
    <div className="relative flex items-center justify-center w-64 h-64 select-none">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient id="hs1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#002B7F" />
            <stop offset="100%" stopColor="#CE1126" />
          </linearGradient>
        </defs>
        
        {/* Background */}
        <circle cx="100" cy="100" r="95" fill="none" stroke="#002B7F" strokeWidth="1" opacity="0.1" />
        
        {/* Left hand */}
        <path d="M 50 110 Q 40 100 45 85 Q 50 75 60 80" fill="none" stroke="url(#hs1)" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
        
        {/* Right hand */}
        <path d="M 150 110 Q 160 100 155 85 Q 150 75 140 80" fill="none" stroke="url(#hs1)" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
        
        {/* Center connection */}
        <circle cx="100" cy="95" r="8" fill="#CE1126" opacity="0.9" />
        <circle cx="100" cy="95" r="5" fill="white" />
        
        {/* Decorative elements */}
        <text x="100" y="160" textAnchor="middle" fontSize="14" fill="#002B7F" opacity="0.4" fontWeight="bold">
          Partnership
        </text>
      </svg>
    </div>
  );
}

// 3. Open Door - Transparency
export function OpenDoorIcon() {
  return (
    <div className="relative flex items-center justify-center w-64 h-64 select-none">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient id="door1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#CE1126" />
            <stop offset="100%" stopColor="#002B7F" />
          </linearGradient>
        </defs>
        
        {/* Frame */}
        <rect x="50" y="40" width="100" height="120" fill="none" stroke="#002B7F" strokeWidth="2" opacity="0.3" />
        
        {/* Door open */}
        <path d="M 100 40 L 130 70 L 130 160 L 100 160 Z" fill="#CE1126" opacity="0.2" stroke="#CE1126" strokeWidth="2" />
        
        {/* Light rays */}
        <line x1="115" y1="50" x2="140" y2="30" stroke="url(#door1)" strokeWidth="2" opacity="0.7" strokeLinecap="round" />
        <line x1="120" y1="100" x2="150" y2="100" stroke="url(#door1)" strokeWidth="2" opacity="0.7" strokeLinecap="round" />
        <line x1="115" y1="150" x2="140" y2="170" stroke="url(#door1)" strokeWidth="2" opacity="0.7" strokeLinecap="round" />
        
        {/* Handle */}
        <circle cx="130" cy="100" r="3" fill="#002B7F" opacity="0.8" />
      </svg>
    </div>
  );
}

// 4. Ascending Bars - Growth & Progress
export function ProgressBarsIcon() {
  return (
    <div className="relative flex items-center justify-center w-64 h-64 select-none">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient id="bars1" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#002B7F" />
            <stop offset="100%" stopColor="#CE1126" />
          </linearGradient>
        </defs>
        
        {/* Grid */}
        <g opacity="0.1" stroke="#002B7F" strokeWidth="0.5">
          <line x1="50" y1="50" x2="150" y2="50" />
          <line x1="50" y1="100" x2="150" y2="100" />
          <line x1="50" y1="150" x2="150" y2="150" />
        </g>
        
        {/* Bars */}
        <rect x="60" y="130" width="12" height="40" fill="url(#bars1)" opacity="0.7" rx="2" />
        <rect x="82" y="100" width="12" height="70" fill="url(#bars1)" opacity="0.8" rx="2" />
        <rect x="104" y="70" width="12" height="100" fill="url(#bars1)" opacity="0.9" rx="2" />
        <rect x="126" y="40" width="12" height="130" fill="url(#bars1)" opacity="1" rx="2" />
        
        {/* Arrow */}
        <path d="M 140 35 L 155 35 L 147.5 25" fill="#CE1126" opacity="0.8" stroke="#CE1126" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

// 5. Lock & Key - Security & Trust
export function LockKeyIcon() {
  return (
    <div className="relative flex items-center justify-center w-64 h-64 select-none">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient id="lock1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#002B7F" />
            <stop offset="100%" stopColor="#CE1126" />
          </linearGradient>
        </defs>
        
        {/* Lock body */}
        <rect x="60" y="90" width="50" height="50" fill="none" stroke="url(#lock1)" strokeWidth="2.5" rx="4" />
        
        {/* Lock shackle */}
        <path d="M 70 90 Q 70 60 100 60 Q 130 60 130 90" fill="none" stroke="url(#lock1)" strokeWidth="2.5" strokeLinecap="round" />
        
        {/* Lock hole */}
        <circle cx="85" cy="115" r="3" fill="url(#lock1)" />
        
        {/* Key */}
        <g opacity="0.8">
          <rect x="120" y="110" width="35" height="5" fill="url(#lock1)" rx="2" />
          <circle cx="158" cy="112.5" r="5" fill="none" stroke="url(#lock1)" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

// 6. Gear System - Process & Workflow
export function GearSystemIcon() {
  return (
    <div className="relative flex items-center justify-center w-64 h-64 select-none">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient id="gear1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#CE1126" />
            <stop offset="100%" stopColor="#002B7F" />
          </linearGradient>
        </defs>
        
        {/* Left gear */}
        <g opacity="0.8">
          <circle cx="70" cy="100" r="22" fill="none" stroke="url(#gear1)" strokeWidth="2.5" />
          {[0, 60, 120, 180, 240, 300].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            return (
              <rect
                key={angle}
                x={70 + Math.cos(rad) * 22 - 2}
                y={100 + Math.sin(rad) * 22 - 4}
                width="4"
                height="8"
                fill="url(#gear1)"
              />
            );
          })}
        </g>
        
        {/* Right gear */}
        <g opacity="0.8">
          <circle cx="130" cy="100" r="18" fill="none" stroke="url(#gear1)" strokeWidth="2.5" />
          {[0, 90, 180, 270].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            return (
              <rect
                key={angle}
                x={130 + Math.cos(rad) * 18 - 2}
                y={100 + Math.sin(rad) * 18 - 3}
                width="4"
                height="6"
                fill="url(#gear1)"
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
}

// 7. Document Shield - Data Protection
export function DocumentShieldIcon() {
  return (
    <div className="relative flex items-center justify-center w-64 h-64 select-none">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient id="doc1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#002B7F" />
            <stop offset="100%" stopColor="#CE1126" />
          </linearGradient>
        </defs>
        
        {/* Document */}
        <rect x="55" y="50" width="35" height="50" fill="none" stroke="url(#doc1)" strokeWidth="2" rx="2" opacity="0.7" />
        
        {/* Document lines */}
        <line x1="60" y1="65" x2="85" y2="65" stroke="url(#doc1)" strokeWidth="1" opacity="0.5" />
        <line x1="60" y1="75" x2="85" y2="75" stroke="url(#doc1)" strokeWidth="1" opacity="0.5" />
        <line x1="60" y1="85" x2="80" y2="85" stroke="url(#doc1)" strokeWidth="1" opacity="0.5" />
        
        {/* Shield */}
        <path d="M 110 65 L 130 55 L 130 85 Q 130 110 110 120 Q 90 110 90 85 L 90 55 Z" fill="url(#doc1)" opacity="0.3" stroke="url(#doc1)" strokeWidth="2" />
        
        {/* Shield checkmark */}
        <path d="M 105 95 L 110 100 L 120 85" fill="none" stroke="#CE1126" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

// 8. Timeline - Process Tracking
export function TimelineIcon() {
  return (
    <div className="relative flex items-center justify-center w-64 h-64 select-none">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient id="timeline1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#CE1126" />
            <stop offset="100%" stopColor="#002B7F" />
          </linearGradient>
        </defs>
        
        {/* Timeline line */}
        <line x1="50" y1="100" x2="150" y2="100" stroke="url(#timeline1)" strokeWidth="2" opacity="0.5" />
        
        {/* Points */}
        {[{ x: 60, label: "Start" }, { x: 100, label: "Process" }, { x: 140, label: "End" }].map((point, i) => (
          <g key={i}>
            <circle cx={point.x} cy="100" r="6" fill="white" stroke="url(#timeline1)" strokeWidth="2.5" />
            {i !== 1 && <circle cx={point.x} cy="100" r="3" fill="url(#timeline1)" />}
          </g>
        ))}
        
        {/* Arrows */}
        <path d="M 75 95 L 85 100 L 75 105" fill="none" stroke="url(#timeline1)" strokeWidth="1.5" opacity="0.7" strokeLinecap="round" />
        <path d="M 115 95 L 125 100 L 115 105" fill="none" stroke="url(#timeline1)" strokeWidth="1.5" opacity="0.7" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// 9. Eye Open - Visibility & Transparency
export function EyeOpenIcon() {
  return (
    <div className="relative flex items-center justify-center w-64 h-64 select-none">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <radialGradient id="eye1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#CE1126" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#002B7F" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Eye outline */}
        <path d="M 60 100 Q 100 70 140 100 Q 100 130 60 100" fill="none" stroke="#002B7F" strokeWidth="2.5" />
        
        {/* Iris */}
        <circle cx="100" cy="100" r="14" fill="url(#eye1)" stroke="#002B7F" strokeWidth="2" opacity="0.8" />
        
        {/* Pupil */}
        <circle cx="100" cy="100" r="8" fill="#CE1126" opacity="0.9" />
        <circle cx="102" cy="98" r="3" fill="white" />
        
        {/* Light rays */}
        {[0, 45, 90, 135].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <line
              key={angle}
              x1={100 + Math.cos(rad) * 14}
              y1={100 + Math.sin(rad) * 14}
              x2={100 + Math.cos(rad) * 30}
              y2={100 + Math.sin(rad) * 30}
              stroke="#CE1126"
              strokeWidth="1.5"
              opacity="0.5"
              strokeLinecap="round"
            />
          );
        })}
      </svg>
    </div>
  );
}

// 10. Infinity Loop - Continuous Support & Long-term Partnership
export function InfinityLoopIcon() {
  return (
    <div className="relative flex items-center justify-center w-64 h-64 select-none">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient id="infinity1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#002B7F" />
            <stop offset="50%" stopColor="#CE1126" />
            <stop offset="100%" stopColor="#002B7F" />
          </linearGradient>
        </defs>
        
        {/* Infinity symbol */}
        <path d="M 50 100 Q 70 70 100 70 Q 130 70 150 100 Q 130 130 100 130 Q 70 130 50 100" fill="none" stroke="url(#infinity1)" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
        <path d="M 50 100 Q 70 130 100 130 Q 130 130 150 100 Q 130 70 100 70 Q 70 70 50 100" fill="none" stroke="url(#infinity1)" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
        
        {/* Center dots */}
        <circle cx="75" cy="100" r="4" fill="#CE1126" opacity="0.9" />
        <circle cx="125" cy="100" r="4" fill="#002B7F" opacity="0.9" />
      </svg>
    </div>
  );
}

// Icon mapping with labels
export const TRANSPARENCY_ICONS = [
  { id: "network", label: "Network Globe", component: NetworkGlobeIcon },
  { id: "handshake", label: "Partnership", component: HandshakeIcon },
  { id: "door", label: "Open Door", component: OpenDoorIcon },
  { id: "progress", label: "Progress", component: ProgressBarsIcon },
  { id: "lock", label: "Security", component: LockKeyIcon },
  { id: "gear", label: "Process", component: GearSystemIcon },
  { id: "document", label: "Data Protection", component: DocumentShieldIcon },
  { id: "timeline", label: "Timeline", component: TimelineIcon },
  { id: "eye", label: "Transparency", component: EyeOpenIcon },
  { id: "infinity", label: "Continuous Support", component: InfinityLoopIcon },
];
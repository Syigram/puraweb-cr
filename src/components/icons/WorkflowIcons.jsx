import React from 'react';

// 1. Network Node Icon (Current - kept for compatibility)
export function NetworkNodeIcon() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <radialGradient id="grad1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#002B7F" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#002B7F" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="96" fill="url(#grad1)" />
      <circle cx="100" cy="100" r="90" fill="none" stroke="#002B7F" strokeWidth="0.8" opacity="0.15" />
      
      <line x1="100" y1="50" x2="100" y2="150" stroke="#002B7F" strokeWidth="1" opacity="0.3" />
      <line x1="50" y1="100" x2="150" y2="100" stroke="#002B7F" strokeWidth="1" opacity="0.3" />
      <line x1="65" y1="65" x2="135" y2="135" stroke="#002B7F" strokeWidth="1" opacity="0.3" />
      <line x1="135" y1="65" x2="65" y2="135" stroke="#002B7F" strokeWidth="1" opacity="0.3" />
      
      <circle cx="100" cy="50" r="8" fill="white" stroke="#002B7F" strokeWidth="1.5" />
      <circle cx="150" cy="100" r="8" fill="white" stroke="#002B7F" strokeWidth="1.5" />
      <circle cx="100" cy="150" r="8" fill="white" stroke="#002B7F" strokeWidth="1.5" />
      <circle cx="50" cy="100" r="8" fill="white" stroke="#002B7F" strokeWidth="1.5" />
      
      <circle cx="100" cy="100" r="14" fill="white" stroke="#002B7F" strokeWidth="2" />
      <circle cx="100" cy="100" r="6" fill="#CE1126" />
    </svg>
  );
}

// 2. Gear & Cog (Process/Work)
export function GearCogIcon() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <radialGradient id="grad2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#002B7F" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#002B7F" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="96" fill="url(#grad2)" />
      <circle cx="100" cy="100" r="90" fill="none" stroke="#002B7F" strokeWidth="0.8" opacity="0.15" />
      
      {/* Large gear */}
      <circle cx="100" cy="100" r="45" fill="none" stroke="#002B7F" strokeWidth="8" opacity="0.7" />
      {[0, 60, 120, 180, 240, 300].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x = 100 + 50 * Math.cos(rad);
        const y = 100 + 50 * Math.sin(rad);
        return <rect key={angle} x={x - 4} y={y - 6} width="8" height="12" fill="#002B7F" />;
      })}
      
      {/* Small gear */}
      <circle cx="155" cy="70" r="25" fill="none" stroke="#CE1126" strokeWidth="6" opacity="0.7" />
      {[0, 90, 180, 270].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x = 155 + 30 * Math.cos(rad);
        const y = 70 + 30 * Math.sin(rad);
        return <rect key={angle} x={x - 3} y={y - 5} width="6" height="10" fill="#CE1126" />;
      })}
      
      <circle cx="100" cy="100" r="8" fill="#002B7F" />
      <circle cx="155" cy="70" r="5" fill="#CE1126" />
    </svg>
  );
}

// 3. Puzzle Pieces (Collaboration)
export function PuzzlePiecesIcon() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <radialGradient id="grad3" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#002B7F" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#002B7F" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="96" fill="url(#grad3)" />
      <circle cx="100" cy="100" r="90" fill="none" stroke="#002B7F" strokeWidth="0.8" opacity="0.15" />
      
      {/* Puzzle piece 1 */}
      <rect x="55" y="55" width="35" height="35" fill="white" stroke="#002B7F" strokeWidth="2" rx="2" />
      <circle cx="72" cy="72" r="6" fill="#002B7F" />
      
      {/* Puzzle piece 2 */}
      <rect x="110" y="55" width="35" height="35" fill="white" stroke="#CE1126" strokeWidth="2" rx="2" />
      <circle cx="127" cy="72" r="6" fill="#CE1126" />
      
      {/* Puzzle piece 3 */}
      <rect x="55" y="110" width="35" height="35" fill="white" stroke="#002B7F" strokeWidth="2" rx="2" />
      <circle cx="72" cy="127" r="6" fill="#002B7F" />
      
      {/* Puzzle piece 4 */}
      <rect x="110" y="110" width="35" height="35" fill="white" stroke="#CE1126" strokeWidth="2" rx="2" />
      <circle cx="127" cy="127" r="6" fill="#CE1126" />
      
      {/* Center connector */}
      <line x1="90" y1="72" x2="110" y2="72" stroke="#002B7F" strokeWidth="1.5" opacity="0.5" />
      <line x1="72" y1="90" x2="72" y2="110" stroke="#002B7F" strokeWidth="1.5" opacity="0.5" />
      <line x1="127" y1="90" x2="127" y2="110" stroke="#CE1126" strokeWidth="1.5" opacity="0.5" />
      <line x1="110" y1="127" x2="90" y2="127" stroke="#CE1126" strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}

// 4. Chart Growth (Progress)
export function ChartGrowthIcon() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <radialGradient id="grad4" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#002B7F" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#002B7F" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="96" fill="url(#grad4)" />
      <circle cx="100" cy="100" r="90" fill="none" stroke="#002B7F" strokeWidth="0.8" opacity="0.15" />
      
      {/* Axes */}
      <line x1="55" y1="140" x2="145" y2="140" stroke="#002B7F" strokeWidth="2" />
      <line x1="55" y1="140" x2="55" y2="50" stroke="#002B7F" strokeWidth="2" />
      
      {/* Bar chart elements */}
      <rect x="70" y="120" width="12" height="20" fill="#002B7F" opacity="0.6" />
      <rect x="85" y="110" width="12" height="30" fill="#002B7F" opacity="0.7" />
      <rect x="100" y="95" width="12" height="45" fill="#CE1126" opacity="0.8" />
      <rect x="115" y="85" width="12" height="55" fill="#CE1126" opacity="0.9" />
      <rect x="130" y="70" width="12" height="70" fill="#002B7F" opacity="0.8" />
      
      {/* Trend line */}
      <polyline points="76,120 91,110 106,95 121,85 136,70" fill="none" stroke="#CE1126" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      
      {/* Arrow */}
      <polygon points="140,65 148,65 144,75" fill="#CE1126" />
    </svg>
  );
}

// 5. Shield with Checkmark (Security/Reliability)
export function ShieldCheckIcon() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <radialGradient id="grad5" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#002B7F" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#002B7F" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="96" fill="url(#grad5)" />
      <circle cx="100" cy="100" r="90" fill="none" stroke="#002B7F" strokeWidth="0.8" opacity="0.15" />
      
      {/* Shield */}
      <path d="M 100 50 L 130 65 L 130 95 Q 100 130 100 130 Q 70 130 70 95 L 70 65 Z" 
        fill="white" stroke="#002B7F" strokeWidth="2.5" />
      
      {/* Checkmark */}
      <path d="M 85 100 L 95 110 L 115 85" fill="none" stroke="#CE1126" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      
      {/* Accent circles */}
      <circle cx="100" cy="60" r="5" fill="#CE1126" />
    </svg>
  );
}

// 6. Workflow Arrows (Process Flow)
export function WorkflowArrowsIcon() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <radialGradient id="grad6" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#002B7F" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#002B7F" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="96" fill="url(#grad6)" />
      <circle cx="100" cy="100" r="90" fill="none" stroke="#002B7F" strokeWidth="0.8" opacity="0.15" />
      
      {/* Vertical flow */}
      <circle cx="100" cy="60" r="10" fill="white" stroke="#002B7F" strokeWidth="2" />
      <line x1="100" y1="70" x2="100" y2="80" stroke="#002B7F" strokeWidth="2" />
      <polygon points="100,90 95,80 105,80" fill="#002B7F" />
      
      {/* Circle in middle */}
      <circle cx="100" cy="100" r="12" fill="#CE1126" />
      
      {/* Bottom arrows spreading */}
      <path d="M 100 112 L 100 120" stroke="#CE1126" strokeWidth="2" />
      <polygon points="80,135 85,125 90,130" fill="#CE1126" />
      <polygon points="100,140 100,130 105,135" fill="#CE1126" />
      <polygon points="120,135 115,125 110,130" fill="#CE1126" />
      
      <line x1="85" y1="128" x2="100" y2="118" stroke="#CE1126" strokeWidth="1.5" opacity="0.6" />
      <line x1="115" y1="128" x2="100" y2="118" stroke="#CE1126" strokeWidth="1.5" opacity="0.6" />
    </svg>
  );
}

// 7. Code Brackets (Development)
export function CodeBracketsIcon() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <radialGradient id="grad7" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#002B7F" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#002B7F" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="96" fill="url(#grad7)" />
      <circle cx="100" cy="100" r="90" fill="none" stroke="#002B7F" strokeWidth="0.8" opacity="0.15" />
      
      {/* Left bracket */}
      <path d="M 75 70 L 65 85 L 65 115 L 75 130" fill="none" stroke="#002B7F" strokeWidth="3" strokeLinecap="round" />
      
      {/* Right bracket */}
      <path d="M 125 70 L 135 85 L 135 115 L 125 130" fill="none" stroke="#CE1126" strokeWidth="3" strokeLinecap="round" />
      
      {/* Center dots */}
      <circle cx="95" cy="90" r="3.5" fill="#002B7F" />
      <circle cx="100" cy="100" r="3.5" fill="#CE1126" />
      <circle cx="105" cy="110" r="3.5" fill="#002B7F" />
    </svg>
  );
}

// 8. Target/Bullseye (Goals)
export function TargetIcon() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <radialGradient id="grad8" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#002B7F" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#002B7F" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="96" fill="url(#grad8)" />
      <circle cx="100" cy="100" r="90" fill="none" stroke="#002B7F" strokeWidth="0.8" opacity="0.15" />
      
      {/* Target rings */}
      <circle cx="100" cy="100" r="60" fill="none" stroke="#002B7F" strokeWidth="2" opacity="0.4" />
      <circle cx="100" cy="100" r="45" fill="none" stroke="#002B7F" strokeWidth="2" opacity="0.6" />
      <circle cx="100" cy="100" r="30" fill="none" stroke="#CE1126" strokeWidth="2" opacity="0.8" />
      
      {/* Center bullseye */}
      <circle cx="100" cy="100" r="12" fill="#CE1126" />
      <circle cx="100" cy="100" r="6" fill="white" />
      
      {/* Arrow */}
      <polygon points="100,75 105,90 95,90" fill="#002B7F" />
    </svg>
  );
}

// 9. Ladder/Steps (Progress/Growth)
export function LadderStepsIcon() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <radialGradient id="grad9" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#002B7F" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#002B7F" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="96" fill="url(#grad9)" />
      <circle cx="100" cy="100" r="90" fill="none" stroke="#002B7F" strokeWidth="0.8" opacity="0.15" />
      
      {/* Left rail */}
      <line x1="65" y1="55" x2="65" y2="140" stroke="#002B7F" strokeWidth="3" />
      {/* Right rail */}
      <line x1="135" y1="55" x2="135" y2="140" stroke="#002B7F" strokeWidth="3" />
      
      {/* Steps */}
      <line x1="65" y1="75" x2="135" y2="75" stroke="#002B7F" strokeWidth="3" />
      <line x1="65" y1="95" x2="135" y2="95" stroke="#CE1126" strokeWidth="3" />
      <line x1="65" y1="115" x2="135" y2="115" stroke="#002B7F" strokeWidth="3" />
      
      {/* Figure on ladder */}
      <circle cx="100" cy="88" r="5" fill="#CE1126" />
      <line x1="100" y1="93" x2="100" y2="108" stroke="#CE1126" strokeWidth="2" />
    </svg>
  );
}

// 10. Circuit Board (Technology)
export function CircuitBoardIcon() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <radialGradient id="grad10" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#002B7F" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#002B7F" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="96" fill="url(#grad10)" />
      <circle cx="100" cy="100" r="90" fill="none" stroke="#002B7F" strokeWidth="0.8" opacity="0.15" />
      
      {/* Connection paths */}
      <path d="M 60 80 L 80 80 L 80 100 L 100 100" fill="none" stroke="#002B7F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 100 100 L 120 100 L 120 120" fill="none" stroke="#CE1126" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 80 100 L 80 130 L 140 130" fill="none" stroke="#002B7F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      
      {/* Nodes */}
      <circle cx="60" cy="80" r="6" fill="white" stroke="#002B7F" strokeWidth="2" />
      <circle cx="80" cy="80" r="5" fill="#002B7F" />
      <circle cx="100" cy="100" r="8" fill="#CE1126" />
      <circle cx="120" cy="120" r="5" fill="#CE1126" />
      <circle cx="140" cy="130" r="6" fill="white" stroke="#CE1126" strokeWidth="2" />
      <circle cx="80" cy="130" r="5" fill="#002B7F" />
    </svg>
  );
}

// Export all icons in an array for easy iteration
export const WORKFLOW_ICONS = [
  { name: 'Network Node', icon: NetworkNodeIcon, id: 'network' },
  { name: 'Gear Cog', icon: GearCogIcon, id: 'gear' },
  { name: 'Puzzle Pieces', icon: PuzzlePiecesIcon, id: 'puzzle' },
  { name: 'Chart Growth', icon: ChartGrowthIcon, id: 'chart' },
  { name: 'Shield Check', icon: ShieldCheckIcon, id: 'shield' },
  { name: 'Workflow Arrows', icon: WorkflowArrowsIcon, id: 'workflow' },
  { name: 'Code Brackets', icon: CodeBracketsIcon, id: 'code' },
  { name: 'Target', icon: TargetIcon, id: 'target' },
  { name: 'Ladder Steps', icon: LadderStepsIcon, id: 'ladder' },
  { name: 'Circuit Board', icon: CircuitBoardIcon, id: 'circuit' },
];
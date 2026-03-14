import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";

// 1. Handshake Flow Icon
const HandshakeFlowIcon = ({ size = 48, primaryColor = "#002B7F", secondaryColor = "#CE1126" }) => (
  <svg viewBox="0 0 100 100" width={size} height={size}>
    <circle cx="50" cy="50" r="48" fill="none" stroke={primaryColor} strokeWidth="1" opacity="0.2" />
    <g>
      <path d="M 30 50 Q 35 45 40 48" fill="none" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" />
      <circle cx="28" cy="50" r="4" fill={primaryColor} />
      <circle cx="42" cy="48" r="4" fill={primaryColor} />
    </g>
    <g>
      <path d="M 60 48 Q 65 45 70 50" fill="none" stroke={secondaryColor} strokeWidth="2" strokeLinecap="round" />
      <circle cx="58" cy="48" r="4" fill={secondaryColor} />
      <circle cx="72" cy="50" r="4" fill={secondaryColor} />
    </g>
    <line x1="45" y1="48" x2="55" y2="48" stroke={primaryColor} strokeWidth="2" opacity="0.6" />
  </svg>
);

// 2. Data Flow Icon
const DataFlowIcon = ({ size = 48, primaryColor = "#002B7F", secondaryColor = "#CE1126" }) => (
  <svg viewBox="0 0 100 100" width={size} height={size}>
    <circle cx="50" cy="50" r="48" fill="none" stroke={primaryColor} strokeWidth="1" opacity="0.2" />
    <g>
      <rect x="15" y="35" width="20" height="30" rx="3" fill={primaryColor} opacity="0.8" />
      <circle cx="25" cy="42" r="2" fill="white" />
      <circle cx="25" cy="50" r="2" fill="white" />
      <circle cx="25" cy="58" r="2" fill="white" />
    </g>
    <path d="M 35 50 L 65 50" stroke={secondaryColor} strokeWidth="2" markerEnd={`url(#arrow)`} />
    <g>
      <rect x="65" y="35" width="20" height="30" rx="3" fill={secondaryColor} opacity="0.8" />
      <circle cx="75" cy="42" r="2" fill="white" />
      <circle cx="75" cy="50" r="2" fill="white" />
      <circle cx="75" cy="58" r="2" fill="white" />
    </g>
    <defs>
      <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill={secondaryColor} />
      </marker>
    </defs>
  </svg>
);

// 3. Feedback Loop Icon
const FeedbackLoopIcon = ({ size = 48, primaryColor = "#002B7F", secondaryColor = "#CE1126" }) => (
  <svg viewBox="0 0 100 100" width={size} height={size}>
    <circle cx="50" cy="50" r="48" fill="none" stroke={primaryColor} strokeWidth="1" opacity="0.2" />
    <g>
      <circle cx="50" cy="30" r="6" fill={primaryColor} />
      <path d="M 56 30 Q 70 40 70 50 Q 70 65 50 70" fill="none" stroke={secondaryColor} strokeWidth="2" strokeLinecap="round" />
      <polygon points="70,50 72,44 68,48" fill={secondaryColor} />
      <path d="M 44 70 Q 30 60 30 50 Q 30 35 50 30" fill="none" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" />
      <polygon points="30,50 28,56 32,52" fill={primaryColor} />
    </g>
  </svg>
);

// 4. Process Steps Icon
const ProcessStepsIcon = ({ size = 48, primaryColor = "#002B7F", secondaryColor = "#CE1126" }) => (
  <svg viewBox="0 0 100 100" width={size} height={size}>
    <circle cx="50" cy="50" r="48" fill="none" stroke={primaryColor} strokeWidth="1" opacity="0.2" />
    {[20, 50, 80].map((x, i) => (
      <g key={i}>
        <circle cx={x} cy="50" r="8" fill={i === 0 ? primaryColor : i === 1 ? secondaryColor : primaryColor} />
        <text x={x} y="56" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">
          {i + 1}
        </text>
        {i < 2 && <line x1={x + 8} y1="50" x2={x + 22} y2="50" stroke={primaryColor} strokeWidth="2" />}
      </g>
    ))}
  </svg>
);

// 5. Shield Transparency Icon
const ShieldTransparencyIcon = ({ size = 48, primaryColor = "#002B7F", secondaryColor = "#CE1126" }) => (
  <svg viewBox="0 0 100 100" width={size} height={size}>
    <circle cx="50" cy="50" r="48" fill="none" stroke={primaryColor} strokeWidth="1" opacity="0.2" />
    <path d="M 50 20 L 70 35 L 70 55 Q 50 75 50 75 Q 30 55 30 55 L 30 35 Z" fill={primaryColor} opacity="0.8" />
    <circle cx="50" cy="50" r="12" fill="white" opacity="0.9" />
    <text x="50" y="56" textAnchor="middle" fontSize="20">✓</text>
  </svg>
);

// 6. Growth Timeline Icon
const GrowthTimelineIcon = ({ size = 48, primaryColor = "#002B7F", secondaryColor = "#CE1126" }) => (
  <svg viewBox="0 0 100 100" width={size} height={size}>
    <circle cx="50" cy="50" r="48" fill="none" stroke={primaryColor} strokeWidth="1" opacity="0.2" />
    <polyline points="20,70 35,55 50,65 65,35 80,45" fill="none" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="20" cy="70" r="4" fill={primaryColor} />
    <circle cx="35" cy="55" r="4" fill={primaryColor} />
    <circle cx="50" cy="65" r="4" fill={secondaryColor} />
    <circle cx="65" cy="35" r="4" fill={secondaryColor} />
    <circle cx="80" cy="45" r="4" fill={primaryColor} />
  </svg>
);

// 7. Partnership Icon
const PartnershipIcon = ({ size = 48, primaryColor = "#002B7F", secondaryColor = "#CE1126" }) => (
  <svg viewBox="0 0 100 100" width={size} height={size}>
    <circle cx="50" cy="50" r="48" fill="none" stroke={primaryColor} strokeWidth="1" opacity="0.2" />
    <g>
      <circle cx="35" cy="40" r="8" fill={primaryColor} />
      <path d="M 27 48 Q 27 55 35 55 L 35 65" fill="none" stroke={primaryColor} strokeWidth="2" />
    </g>
    <g>
      <circle cx="65" cy="40" r="8" fill={secondaryColor} />
      <path d="M 73 48 Q 73 55 65 55 L 65 65" fill="none" stroke={secondaryColor} strokeWidth="2" />
    </g>
    <line x1="40" y1="42" x2="60" y2="42" stroke={primaryColor} strokeWidth="2" />
    <circle cx="50" cy="42" r="2" fill={primaryColor} />
  </svg>
);

// 8. Commitment Icon
const CommitmentIcon = ({ size = 48, primaryColor = "#002B7F", secondaryColor = "#CE1126" }) => (
  <svg viewBox="0 0 100 100" width={size} height={size}>
    <circle cx="50" cy="50" r="48" fill="none" stroke={primaryColor} strokeWidth="1" opacity="0.2" />
    <rect x="25" y="30" width="50" height="45" rx="5" fill="none" stroke={primaryColor} strokeWidth="2" />
    <line x1="25" y1="42" x2="75" y2="42" stroke={primaryColor} strokeWidth="1" opacity="0.5" />
    <path d="M 35 50 L 40 56 L 55 45" fill="none" stroke={secondaryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 9. Network Icon
const NetworkNodeIcon = ({ size = 48, primaryColor = "#002B7F", secondaryColor = "#CE1126" }) => (
  <svg viewBox="0 0 100 100" width={size} height={size}>
    <circle cx="50" cy="50" r="48" fill="none" stroke={primaryColor} strokeWidth="1" opacity="0.2" />
    <circle cx="50" cy="30" r="5" fill={primaryColor} />
    <circle cx="30" cy="60" r="5" fill={secondaryColor} />
    <circle cx="70" cy="60" r="5" fill={primaryColor} />
    <circle cx="50" cy="75" r="5" fill={secondaryColor} />
    <line x1="50" y1="30" x2="30" y2="60" stroke={primaryColor} strokeWidth="1.5" opacity="0.6" />
    <line x1="50" y1="30" x2="70" y2="60" stroke={primaryColor} strokeWidth="1.5" opacity="0.6" />
    <line x1="50" y1="30" x2="50" y2="75" stroke={primaryColor} strokeWidth="1.5" opacity="0.6" />
    <line x1="30" y1="60" x2="70" y2="60" stroke={primaryColor} strokeWidth="1.5" opacity="0.6" />
  </svg>
);

// 10. Success Cycle Icon
const SuccessCycleIcon = ({ size = 48, primaryColor = "#002B7F", secondaryColor = "#CE1126" }) => (
  <svg viewBox="0 0 100 100" width={size} height={size}>
    <circle cx="50" cy="50" r="48" fill="none" stroke={primaryColor} strokeWidth="1" opacity="0.2" />
    <circle cx="50" cy="50" r="35" fill="none" stroke={primaryColor} strokeWidth="1" opacity="0.3" strokeDasharray="5 5" />
    <g transform="translate(50, 50)">
      <path d="M 0,-28 A 28,28 0 0,1 19,20" fill="none" stroke={secondaryColor} strokeWidth="2.5" strokeLinecap="round" />
      <polygon points="19,20 14,8 24,12" fill={secondaryColor} />
      <circle cx="0" cy="-28" r="3" fill={primaryColor} />
    </g>
    <path d="M 50 70 L 45 62 L 55 62 Z" fill={primaryColor} />
  </svg>
);

const ICONS = [
  { name: "Handshake Flow", component: HandshakeFlowIcon },
  { name: "Data Flow", component: DataFlowIcon },
  { name: "Feedback Loop", component: FeedbackLoopIcon },
  { name: "Process Steps", component: ProcessStepsIcon },
  { name: "Shield & Trust", component: ShieldTransparencyIcon },
  { name: "Growth Timeline", component: GrowthTimelineIcon },
  { name: "Partnership", component: PartnershipIcon },
  { name: "Commitment", component: CommitmentIcon },
  { name: "Network", component: NetworkNodeIcon },
  { name: "Success Cycle", component: SuccessCycleIcon }
];

export default function TransparencyIconsShowcase() {
  const [selectedIcon, setSelectedIcon] = React.useState(0);
  const SelectedComponent = ICONS[selectedIcon].component;

  return (
    <div className="w-full space-y-8">
      {/* Showcase */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-red-50 rounded-2xl border border-blue-200"
      >
        <div className="w-32 h-32 flex items-center justify-center mb-6">
          <SelectedComponent size={128} primaryColor="#002B7F" secondaryColor="#CE1126" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 text-center">
          {ICONS[selectedIcon].name}
        </h3>
      </motion.div>

      {/* Selector */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700">
          Choose an Icon:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {ICONS.map((icon, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedIcon(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedIcon === index
                  ? "border-blue-900 bg-blue-100 shadow-lg"
                  : "border-gray-300 bg-white hover:border-blue-500"
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 flex items-center justify-center">
                  <icon.component
                    size={40}
                    primaryColor={selectedIcon === index ? "#002B7F" : "#666"}
                    secondaryColor={selectedIcon === index ? "#CE1126" : "#999"}
                  />
                </div>
                <span className="text-xs font-medium text-gray-700 text-center line-clamp-2">
                  {icon.name}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Grid Preview */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700">
          All Icons Preview:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {ICONS.map((icon, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col items-center p-3 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 flex items-center justify-center mb-2">
                <icon.component size={48} primaryColor="#002B7F" secondaryColor="#CE1126" />
              </div>
              <span className="text-xs font-medium text-gray-600 text-center">
                {icon.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { ICONS };
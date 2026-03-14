import React, { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import all custom icon components
import ProcessNetworkIcon from "./heroIcons/ProcessNetworkIcon";
import TransparencyWindowIcon from "./heroIcons/TransparencyWindowIcon";
import HandshakeBridgeIcon from "./heroIcons/HandshakeBridgeIcon";
import DataFlowIcon from "./heroIcons/DataFlowIcon";
import PillarStructureIcon from "./heroIcons/PillarStructureIcon";
import TimelinePathIcon from "./heroIcons/TimelinePathIcon";
import LockShieldIcon from "./heroIcons/LockShieldIcon";
import PartnershipChainIcon from "./heroIcons/PartnershipChainIcon";
import GrowthStairsIcon from "./heroIcons/GrowthStairsIcon";
import TrustCompassIcon from "./heroIcons/TrustCompassIcon";

const ICONS = [
  {
    id: "network",
    name: "Process Network",
    component: ProcessNetworkIcon,
    description: "Conectividad y procesos"
  },
  {
    id: "transparency",
    name: "Transparency Window",
    component: TransparencyWindowIcon,
    description: "Transparencia clara"
  },
  {
    id: "handshake",
    name: "Handshake Bridge",
    component: HandshakeBridgeIcon,
    description: "Colaboración y confianza"
  },
  {
    id: "dataflow",
    name: "Data Flow",
    component: DataFlowIcon,
    description: "Flujo de datos seguro"
  },
  {
    id: "pillars",
    name: "Pillar Structure",
    component: PillarStructureIcon,
    description: "Cimientos sólidos"
  },
  {
    id: "timeline",
    name: "Timeline Path",
    component: TimelinePathIcon,
    description: "Camino claro y progreso"
  },
  {
    id: "shield",
    name: "Lock Shield",
    component: LockShieldIcon,
    description: "Seguridad y protección"
  },
  {
    id: "partnership",
    name: "Partnership Chain",
    component: PartnershipChainIcon,
    description: "Relaciones integradas"
  },
  {
    id: "growth",
    name: "Growth Stairs",
    component: GrowthStairsIcon,
    description: "Crecimiento progresivo"
  },
  {
    id: "compass",
    name: "Trust Compass",
    component: TrustCompassIcon,
    description: "Dirección y confiabilidad"
  }
];

export default function HeroIconPicker() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const currentIcon = useMemo(() => ICONS[selectedIndex], [selectedIndex]);
  const CurrentComponent = currentIcon.component;

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev === 0 ? ICONS.length - 1 : prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev === ICONS.length - 1 ? 0 : prev + 1));
  }, []);

  const selectIcon = useCallback((index) => {
    setSelectedIndex(index);
  }, []);

  return (
    <div className="flex flex-col gap-6 items-center">
      {/* Icon Display */}
      <motion.div
        className="relative w-64 h-64 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIcon.id}
            initial={{ opacity: 0, scale: 0.9, rotateY: -45 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotateY: 45 }}
            transition={{ duration: 0.3 }}
          >
            <CurrentComponent />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Icon Name */}
      <motion.div
        key={`label-${currentIcon.id}`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.3 }}
        className="text-center"
      >
        <h3 className="text-lg font-bold text-gray-900">{currentIcon.name}</h3>
        <p className="text-sm text-gray-500">{currentIcon.description}</p>
      </motion.div>

      {/* Navigation Controls */}
      <div className="flex items-center gap-4 mt-4">
        <button
          onClick={handlePrev}
          aria-label="Previous icon"
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>

        {/* Dot Indicators */}
        <div className="flex gap-2">
          {ICONS.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => selectIcon(index)}
              className={`transition-all ${
                selectedIndex === index
                  ? "bg-blue-900 w-2.5 h-2.5"
                  : "bg-gray-300 w-2 h-2 hover:bg-gray-400"
              } rounded-full`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          aria-label="Next icon"
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Icon Counter */}
      <p className="text-xs text-gray-400 mt-2">
        {selectedIndex + 1} / {ICONS.length}
      </p>
    </div>
  );
}
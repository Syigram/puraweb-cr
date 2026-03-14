import React, { useState, lazy, Suspense, memo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ICONS = [
  { id: "globe",    label: "Globo Tecnológico",  emoji: "🌐" },
  { id: "home",     label: "Casa + Código",       emoji: "🏠" },
  { id: "hands",    label: "Manos Web",           emoji: "🤝" },
  { id: "shield",   label: "Escudo Circuito",     emoji: "🛡️" },
  { id: "rocket",   label: "Cohete",              emoji: "🚀" },
  { id: "team",     label: "Red de Equipo",       emoji: "👥" },
  { id: "dna",      label: "ADN de Código",       emoji: "🧬" },
  { id: "map",      label: "Pin Local / Global",  emoji: "📍" },
  { id: "terminal", label: "Terminal",            emoji: "💻" },
  { id: "growth",   label: "Crecimiento",         emoji: "📈" },
  { id: "infinity", label: "Mejora Continua",     emoji: "∞" },
];

// Lazy load all icons
const components = {
  globe:    lazy(() => import("./TechGlobeIcon")),
  home:     lazy(() => import("./icons/HomeCodeIcon")),
  hands:    lazy(() => import("./icons/WebHandsIcon")),
  shield:   lazy(() => import("./icons/ShieldCircuitIcon")),
  rocket:   lazy(() => import("./icons/RocketLaunchIcon")),
  team:     lazy(() => import("./icons/TeamNetworkIcon")),
  dna:      lazy(() => import("./icons/DNACodeIcon")),
  map:      lazy(() => import("./icons/MapPinNetworkIcon")),
  terminal: lazy(() => import("./icons/TerminalTypingIcon")),
  growth:   lazy(() => import("./icons/GrowthChartIcon")),
  infinity: lazy(() => import("./icons/InfinityLoopIcon")),
};

const IconFallback = () => (
  <div className="w-60 h-60 flex items-center justify-center">
    <div className="w-10 h-10 border-2 border-blue-900 border-t-transparent rounded-full animate-spin" />
  </div>
);

const HeroIconPicker = memo(function HeroIconPicker() {
  const [selected, setSelected] = useState("globe");

  const currentIdx = ICONS.findIndex(i => i.id === selected);
  const prev = () => setSelected(ICONS[(currentIdx - 1 + ICONS.length) % ICONS.length].id);
  const next = () => setSelected(ICONS[(currentIdx + 1) % ICONS.length].id);

  const SelectedComponent = components[selected];

  return (
    <div className="flex flex-col items-center gap-4 flex-shrink-0">
      {/* Icon display */}
      <div className="relative">
        <Suspense fallback={<IconFallback />}>
          <SelectedComponent />
        </Suspense>
      </div>

      {/* Navigation arrows + label */}
      <div className="flex items-center gap-3">
        <button
          onClick={prev}
          className="p-1.5 rounded-full border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-slate-500 hover:text-blue-900"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <span className="text-xs font-medium text-slate-500 w-36 text-center">
          {ICONS[currentIdx].emoji} {ICONS[currentIdx].label}
        </span>

        <button
          onClick={next}
          className="p-1.5 rounded-full border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-slate-500 hover:text-blue-900"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex gap-1.5 flex-wrap justify-center max-w-[180px]">
        {ICONS.map((icon) => (
          <button
            key={icon.id}
            onClick={() => setSelected(icon.id)}
            title={icon.label}
            className={`w-2 h-2 rounded-full transition-all ${
              icon.id === selected
                ? "bg-blue-900 scale-125"
                : "bg-slate-200 hover:bg-slate-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
});

export default HeroIconPicker;
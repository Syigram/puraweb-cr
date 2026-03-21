import React, { useState, memo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, ChevronUp, ChevronDown } from "lucide-react";
import { heroVariants } from "./PortfolioHeroVariants";

const HeroSelectorWidget = memo(function HeroSelectorWidget({ activeId, onChange }) {
  const [open, setOpen] = useState(false);

  return createPortal(
    <div className="fixed bottom-6 left-4 z-[9999] flex flex-col items-start">
      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="mb-2 bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden w-56"
          >
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Hero Style</p>
            </div>
            <div className="overflow-y-auto max-h-72 py-1">
              {heroVariants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => { onChange(v.id); setOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between transition-colors ${
                    activeId === v.id
                      ? "bg-blue-900 text-white font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span className="font-mono text-xs w-10 flex-shrink-0 opacity-60">{v.label}</span>
                  <span className="flex-1">Hero {v.id}</span>
                  {activeId === v.id && (
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold px-3.5 py-2.5 rounded-xl shadow-lg transition-colors"
      >
        <Layers className="w-3.5 h-3.5" />
        <span>Hero {activeId}</span>
        {open ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
      </button>
    </div>,
    document.body
  );
});

export default HeroSelectorWidget;
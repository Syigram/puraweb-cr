import React, { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, ChevronUp, ChevronDown } from "lucide-react";
import { heroCount } from "./PortfolioHeroSections";

const PortfolioHeroSelector = memo(function PortfolioHeroSelector({ current, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-3 w-48 max-h-72 overflow-y-auto"
          >
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 px-1">Hero Variant</p>
            <div className="flex flex-col gap-1">
              {Array.from({ length: heroCount }, (_, i) => (
                <button
                  key={i}
                  onClick={() => { onChange(i); setOpen(false); }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all text-left ${
                    current === i
                      ? "bg-blue-900 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 ${
                    current === i ? "bg-white text-blue-900" : "bg-gray-200 text-gray-600"
                  }`}>
                    {i + 1}
                  </span>
                  Variant {i + 1}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg transition-all"
        title="Select hero variant"
      >
        <Layers className="w-4 h-4" />
        <span>Hero {current + 1}</span>
        {open ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
      </button>
    </div>
  );
});

export default PortfolioHeroSelector;
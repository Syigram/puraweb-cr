import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, ChevronUp, ChevronDown, Check } from "lucide-react";
import { HERO_SECTIONS } from "./NosotrosHeroSections";

export default function HeroStylePicker({ selected, onSelect }) {
  const [open, setOpen] = useState(false);

  const handleSelect = useCallback((id) => {
    onSelect(id);
    setOpen(false);
  }, [onSelect]);

  const current = HERO_SECTIONS.find(h => h.id === selected);

  return (
    <div
      style={{ position: 'fixed', bottom: '24px', left: '24px', zIndex: 9999 }}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="mb-3 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden w-56"
          >
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                Estilo de Hero
              </p>
            </div>
            <div className="overflow-y-auto max-h-72 py-1">
              {HERO_SECTIONS.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => handleSelect(id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-blue-50 ${
                    selected === id ? 'bg-blue-50 text-blue-900 font-semibold' : 'text-gray-700'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center text-xs font-bold ${
                    selected === id ? 'border-blue-900 bg-blue-900 text-white' : 'border-gray-200 text-gray-400'
                  }`}>
                    {selected === id ? <Check className="w-3 h-3" /> : id}
                  </span>
                  <span className="truncate">{label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-2.5 bg-blue-900 hover:bg-blue-800 text-white px-4 py-3 rounded-2xl shadow-xl transition-colors"
        style={{ boxShadow: '0 8px 32px rgba(0,43,127,0.35)' }}
      >
        <Palette className="w-4 h-4 flex-shrink-0" />
        <span className="text-sm font-semibold max-w-[100px] truncate">
          {current ? current.label : 'Hero Style'}
        </span>
        {open ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
      </motion.button>
    </div>
  );
}